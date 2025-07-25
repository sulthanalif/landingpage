<?php

use App\ManageDatas;
// use App\Models\Dealer;
use Mary\Traits\Toast;
use App\Models\Voucher;
use App\Models\Campaign;
// use App\Traits\LogFormatter;
// use App\Models\BudgetPeriod;
use App\Exports\ExportDatas;
use Livewire\Attributes\Url;
// use App\Traits\CreateOrUpdate;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Maatwebsite\Excel\Facades\Excel;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

new #[Title('Form Campaign')] class extends Component {
    use Toast, WithPagination, ManageDatas, WithFileUploads;

    public bool $modalAlertDelete = false;

    public string $search = '';

    public string $name = '';
    public string $start_date = '';
    public string $end_date = '';
    // public string $budget = '';
    public bool $status = true;
    public array $varBudgetPeriod = ['recordId', 'name', 'start_date', 'end_date', 'status'];

    // public Collection $dealersSearchable;

    public array $vouchers = [];
    public array $voucherOrder = [];
    public int $total = 0;

    #[Url]
    public ?int $id = null;


    public function mount(): void
    {
        // $this->searchDealer();

        if ($this->id) {
            $this->edit();
        }
    }

    public function updatedSearch(): void
    {
        if ($this->id) {
            $this->edit();
        }
    }

    public function formatPercentage($value): string
    {
        if (is_string($value)) {
            $value = (float) $value;
        }

        return is_int($value) ? (string) $value : rtrim(rtrim(number_format($value, 2, '.', ''), '0'), '.');
    }

    public function exportVoucher()
    {
        $vouchers = Campaign::findOrFail($this->id)->vouchers()->get();

        if (count($this->voucherOrder) == 0) {
            $this->error('Data tidak ditemukan', position: 'toast-bottom');
        } else {
            try {

                $data = $vouchers->map(function ($voucher) {
                    return [
                        'VOUHCER_CODE' => $voucher->code,
                        'PERSENTASE' => $voucher->percentage,
                        'IS_CLAIMED' => $voucher->is_claimed
                    ];
                });

                $headers = ['VOUHCER_CODE', 'PERSENTASE', 'IS_CLAIMED'];

                return Excel::download(new ExportDatas(collect($data), 'Data Voucher', $headers), 'data-voucher-'. $this->name .'-'. date('d-m-Y') . '.xlsx');
            } catch (\Exception $e) {
                \Log::channel('debug')->error("message: '{$e->getMessage()}',  file: '{$e->getFile()}',  line: {$e->getLine()}");
            }
        }
    }

    public function edit(): void
    {
        $budgetPeriod = Campaign::findOrFail($this->id);

        $this->name = $budgetPeriod->name;
        $this->start_date = $budgetPeriod->start_date;
        $this->end_date = $budgetPeriod->end_date;
        $this->status = $budgetPeriod->status;

        $this->voucherOrder = $budgetPeriod->vouchers()
            ->where('status', true)
            ->where('code', 'like', "%{$this->search}%")
            ->get()
            ->map(function ($voucher) {
                return [
                    // [MODIFIKASI] Tambahkan id voucher di sini
                    'id' => $voucher->id,
                    'code' => $voucher->code,
                    'percentage' => $this->formatPercentage($voucher->percentage),
                    'is_claimed' => $voucher->is_claimed,
                ];
            })
            ->values()
            ->toArray();

            $vouchers = $budgetPeriod->vouchers()
                ->where('status', true)
                ->get()
                ->groupBy('percentage')
                ->map(function ($group, $percentage) {
                    $totalVouchers = $group->count();
                    $claimedVouchers = $group->where('is_claimed', true)->count();

                    return [
                        'percentage' => $this->formatPercentage($percentage),
                        'qty' => $totalVouchers,
                        'is_claimed' => $claimedVouchers > 0,
                        // 'used' => $claimedVouchers,
                        'remaining' => $totalVouchers - $claimedVouchers
                    ];
                })
                ->values()
                ->toArray();

        $this->vouchers = $vouchers;
        $this->countTotalNominal();
    }

    public function deleteSingleVoucher(int $voucherId): void
    {
        try {
            $voucher = Voucher::findOrFail($voucherId);

            // Pencegahan: jangan hapus jika voucher sudah diklaim
            if ($voucher->is_claimed) {
                $this->error('Voucher ini sudah diklaim dan tidak bisa dihapus.', position: 'toast-bottom');
                return;
            }

            $voucher->delete();

            // Refresh data di halaman setelah hapus
            $this->edit();

            $this->success('Voucher berhasil dihapus.', position: 'toast-bottom');

        } catch (\Throwable $th) {
            \Log::channel('debug')->error("message: '{$th->getMessage()}', file: '{$th->getFile()}', line: {$th->getLine()}");
            $this->error('Gagal menghapus voucher.', position: 'toast-bottom');
        }
    }

    public function back(): void
    {
        $this->redirect(route('campaign'), navigate: true);
    }

    public function countTotalNominal(): void
    {
        $this->total = (int) collect($this->vouchers)->sum('qty');

        $this->dispatch('$refresh');
    }

    public function addVoucher(): void
    {
        $this->vouchers[] = ['percentage' => '', 'qty' => '', 'used' => '', 'is_claimed' => false];
    }

    public function deleteVoucher(int $index): void
    {
        unset($this->vouchers[$index]);
        $this->vouchers = array_values($this->vouchers);

        $this->countTotalNominal();
    }

    public function save(): void
    {
        $this->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|boolean',
        ]);

        $vouchers = collect($this->vouchers)
            ->filter(fn ($voucher) => filled($voucher['percentage']) && filled($voucher['qty']))
            ->filter(fn ($voucher) => (float) $voucher['percentage'] > 0 && (int) $voucher['qty'] > 0);

        if ($vouchers->isEmpty()) {
            $this->warning('Voucher Tidak Boleh Kosong!', position: 'toast-bottom');
            return;
        }

        // Check if new voucher quantities are less than claimed vouchers
        if ($this->id) {
            $campaign = Campaign::findOrFail($this->id);

            foreach ($vouchers as $voucher) {
                $percentage = (float) $voucher['percentage'];
                $newQty = (int) $voucher['qty'];

                $claimedCount = $campaign->vouchers()
                    ->where('percentage', $percentage)
                    ->where('is_claimed', true)
                    ->count();

                if ($newQty < $claimedCount) {
                    $this->error("Jumlah voucher {$percentage}% tidak boleh kurang dari jumlah yang sudah diklaim ({$claimedCount})", position: 'toast-bottom');
                    return;
                }
            }
        }

        // Validasi overlap tanggal
        $overlapExists = Campaign::when($this->id, fn($q) => $q->where('id', '!=', $this->id))
            ->where('name', $this->name)
            ->where('start_date', '<=', $this->end_date)
            ->where('end_date', '>=', $this->start_date)
            ->exists();

        if ($overlapExists) {
            $this->error('Periode campaign dengan nama yang sama sudah ada.', position: 'toast-bottom');
            return;
        }

        try {
            DB::beginTransaction();

            $campaign = $this->id
                ? Campaign::findOrFail($this->id)
                : new Campaign();

            $campaign->fill([
                'name' => $this->name,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'status' => $this->status,
            ]);
            $campaign->save();

            if ($this->id) {
                $existingVouchers = $campaign->vouchers()
                    ->where('status', true)
                    ->where('is_claimed', false)
                    ->get()
                    ->groupBy(fn ($item) => number_format((float) $item->percentage, 2)); // Normalize key

                // Combine vouchers with same percentage and sum their quantities
                $newVoucherData = $vouchers->reduce(function ($carry, $item) {
                    $key = number_format((float) $item['percentage'], 2); // Normalize key
                    if (!isset($carry[$key])) {
                        $carry[$key] = 0;
                    }
                    $carry[$key] += (int) $item['qty'];
                    return $carry;
                }, []);

                foreach ($newVoucherData as $percentageKey => $newQty) {
                    $percentage = (float) $percentageKey;
                    $existing = $existingVouchers->get($percentageKey, collect());
                    $existingQty = $existing->count();

                    if ($newQty > $existingQty) {
                        for ($i = 0; $i < ($newQty - $existingQty); $i++) {
                            Voucher::create([
                                'campaign_id' => $campaign->id,
                                'percentage' => $percentage,
                                'status' => true,
                                'is_claimed' => false,
                            ]);
                        }
                    } elseif ($newQty < $existingQty) {
                        $toDelete = $existing->take($existingQty - $newQty);
                        Voucher::whereIn('id', $toDelete->pluck('id'))->delete();
                    }
                }

                // Hapus voucher lama yang persentasenya tidak ada di input baru
                $incomingPercentages = array_keys($newVoucherData);
                $vouchersToRemove = $existingVouchers
                    ->filter(fn ($_v, $key) => !in_array($key, $incomingPercentages))
                    ->flatten();

                Voucher::whereIn('id', $vouchersToRemove->pluck('id'))->delete();
            } else {
                // Create mode
                foreach ($vouchers as $voucher) {
                    $percentage = (float) $voucher['percentage'];
                    $qty = (int) $voucher['qty'];

                    for ($i = 0; $i < $qty; $i++) {
                        Voucher::create([
                            'campaign_id' => $campaign->id,
                            'percentage' => $percentage,
                            'status' => true,
                            'is_claimed' => false,
                        ]);
                    }
                }
            }

            DB::commit();

            $message = $this->id
                ? 'Campaign berhasil diperbarui.'
                : 'Campaign berhasil dibuat.';

            $this->success($message, position: 'toast-bottom', redirectTo: route('campaign'));
        } catch (\Throwable $th) {
            DB::rollBack();
            \Log::channel('debug')->error("message: '{$th->getMessage()}', file: '{$th->getFile()}', line: {$th->getLine()}");
            $this->error('Terjadi kesalahan saat menyimpan data.', position: 'toast-bottom');
        }
    }

    public function deleteCampaign(): void
    {
        try{
            DB::beginTransaction();

            $campaign = Campaign::findOrFail($this->id);

            // Check if campaign has any claimed vouchers
            $hasClaimedVouchers = $campaign->vouchers()->where('is_claimed', true)->exists();

            if ($hasClaimedVouchers) {
                $this->error('Tidak dapat menghapus campaign karena voucher sudah ada yang terpakai!.', position: 'toast-bottom');
                return;
            }

            $campaign->delete();

            DB::commit();

            $this->success('Campaign berhasil dihapus.', position: 'toast-bottom', redirectTo: route('campaign'));
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->error('Terjadi kesalahan saat menghapus data.', position: 'toast-bottom');
            \Log::channel('debug')->error("message: '{$th->getMessage()}', file: '{$th->getFile()}', line: {$th->getLine()}");
        }
    }



}; ?>


<div>
    <!-- HEADER -->
    <x-header title="Form Campaign" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" />
        </x-slot:actions>
    </x-header>

    <x-form wire:submit='save'>
        <div class="flex flex-col md:flex-row gap-4">
            <x-card title="Campaign" shadow class="w-full md:w-1/2">
                <div>
                    <x-input label='Name' wire:model="name" placeholder="Masukkan Nama Campaign" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                        <x-datepicker label="Tanggal Mulai" wire:model="start_date" icon="o-calendar" />
                    </div>
                    <div>
                        <x-datepicker label="Tanggal Berakhir" wire:model="end_date" icon="o-calendar"/>
                    </div>
                </div>

                {{-- <div>
                    <x-input label="Budget" wire:model="budget" prefix="Rp" locale="pt-ID" money />
                </div> --}}

                <div class="mt-3">
                    <x-toggle label="Status" wire:model="status" />
                </div>
            </x-card>

            <x-card title="Voucher" shadow class="w-full md:w-1/2">
                <table class="w-full table-auto text-sm">
                    <thead class="bg-gray-100 text-left">
                        <tr class="">
                            <th class="px-4 py-2 border-b">Discount Voucher (%)</th>
                            <th class="px-2 py-2 border-b">Jumlah Voucher</th>
                            <th class="px-2 py-2 border-b">Sisa Voucher</th>
                        </tr>
                    </thead>
                    <tbody >
                        @forelse ($vouchers as $index => $voucher)
                            <tr>
                                <td class="px-4 py-2 ">
                                    @if($this->id)
                                    <x-input
                                        class="w-full"
                                        wire:model.live="vouchers.{{ $index }}.percentage"
                                        readonly
                                    />
                                    @else
                                    <x-input
                                        class="w-full"
                                        wire:model.live="vouchers.{{ $index }}.percentage"
                                    />

                                    @endif
                                </td>
                                <td class="px-2 py-2 ">
                                    <x-input
                                        type="number"
                                        class="w-full"
                                        wire:model.live="vouchers.{{ $index }}.qty"
                                        @change="$wire.countTotalNominal()"
                                    />
                                </td>
                                <td class="px-2 py-2 ">
                                    <x-input
                                        type="number"
                                        class="w-full"
                                        wire:model.live="vouchers.{{ $index }}.remaining"
                                        @change="$wire.countTotalNominal()"
                                        readonly
                                    />
                                </td>
                                <td class="px-4 py-2  text-right">
                                    @if(!$voucher['is_claimed'])
                                    <x-button
                                        icon="o-trash"
                                        @click="$wire.deleteVoucher({{ $index }})"
                                        spinner="deleteVoucher({{ $index }})"
                                    />
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2" class="px-4 py-4 text-center text-gray-500">
                                    <x-icon name="o-cube" label="It is empty." />
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="px-4 py-2 border-t">
                                Total Voucher
                            </th>
                            <th class="px-4 py-2 border-t">
                                <x-input

                                        class="w-full"
                                        {{-- prefix="Rp" --}}
                                        :value="$total"
                                        {{-- prefix="Rp" --}}
                                        {{-- locale="pt-ID"
                                        money --}}
                                        readonly
                                    />
                            </th>
                        </tr>
                    </tfoot>
                </table>

                <x-button label="Tambah Voucher" icon="o-plus" class="w-full mt-3" @click="$wire.addVoucher" spinner="addVoucher" />
            </x-card>
        </div>
        <div class="w-full">
            <x-card title="Voucher List" shadow class="w-full ">
                <x-slot:menu>
                    @if ($this->id)
                        <x-button label="Export Voucher" icon="o-arrow-down-tray" wire:click="exportVoucher" spinner="exportVoucher" />
                    @endif
                    <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
                </x-slot:menu>
                <div class="h-64 overflow-y-auto ">
                    <div class="max-h-60 overflow-y-auto">
                        <table class="w-full table-auto">
                            <thead class="bg-gray-100 sticky top-0 z-10 text-left">
                                <tr class="">
                                    <th class="px-4 py-2 border-b">Kode Voucher</th>
                                    <th class="px-4 py-2 border-b">Discount (%)</th>
                                    <th class="px-4 py-2 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($voucherOrder as $index => $voucher)
                                    <tr style="{{ $voucher['is_claimed'] ? 'background-color: #FFC0CB;' : '' }}">
                                        <td class="px-4 py-2">
                                            {{ $voucher['code'] }}
                                        </td>
                                        <td class="px-4 py-2">
                                            {{ $voucher['percentage'] }}%
                                        </td>
                                        <td class="px-4 py-2">
                                            @if (!$voucher['is_claimed'])
                                                <x-button
                                                    icon="o-trash"
                                                    class="btn-error btn-sm"
                                                    wire:click="deleteSingleVoucher({{ $voucher['id'] }})"
                                                    {{-- wire:confirm="Anda yakin ingin menghapus voucher ini?" --}}
                                                    spinner="deleteSingleVoucher({{ $voucher['id'] }})"
                                                />
                                            @endif
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="3" class="px-4 py-4 text-center text-gray-500">
                                            <x-icon name="o-cube" label="It is empty." />
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </x-card>
        </div>
        <x-slot:actions>
            @if($this->id)
                <x-button label="Delete" class="btn-error" @click="$wire.modalAlertDelete = true" />
            @endif
            <x-button label="Save" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>
    <x-modal wire:model="modalAlertDelete">
        <x-form wire:submit="deleteCampaign" class="relative" no-separator>
            <div class="flex justify-center items-center">
                    <div class="mb-5 rounded-lg w-full text-center">
                    <x-icon name="c-shield-exclamation" class="w-16 h-16 text-red-700 mx-auto mb-4" />
                    <p class="text-center">Apakah anda yakin untuk menghapus campaign ini?</p>
                </div>
            </div>
            <x-slot:actions>
                <x-button label="Tidak" @click="$wire.modalAlertDelete = false" />
                <x-button label="Ya" class="btn-primary" type="submit" spinner="delete" />
            </x-slot:actions>
        </x-form>
    </x-modal>
</div>
