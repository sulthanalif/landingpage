<?php

use App\ManageDatas;
// use App\Models\Dealer;
use Mary\Traits\Toast;
use App\Models\Voucher;
use App\Models\Campaign;
// use App\Traits\LogFormatter;
// use App\Models\BudgetPeriod;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;
// use App\Traits\CreateOrUpdate;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

new #[Title('Form Campaign')] class extends Component {
    use Toast, WithPagination, ManageDatas, WithFileUploads;

    public string $name = '';
    public string $start_date = '';
    public string $end_date = '';
    // public string $budget = '';
    public bool $status = true;
    public array $varBudgetPeriod = ['recordId', 'name', 'start_date', 'end_date', 'status'];

    // public Collection $dealersSearchable;

    public array $vouchers = [];
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

    public function formatPercentage($value): string
    {
        if (is_string($value)) {
            $value = (float) $value;
        }

        return is_int($value) ? (string) $value : rtrim(rtrim(number_format($value, 2, '.', ''), '0'), '.');
    }

    public function edit(): void
    {
        $budgetPeriod = Campaign::findOrFail($this->id);

        $this->name = $budgetPeriod->name;
        $this->start_date = $budgetPeriod->start_date;
        $this->end_date = $budgetPeriod->end_date;
        // $this->budget = $budgetPeriod->budget;
        $this->status = $budgetPeriod->status;

        $vouchers = $budgetPeriod->vouchers()
            ->where('status', true)
            ->where('is_claimed', false)
            // ->where('is_locked', false)
            ->get()
            ->groupBy('percentage')
            ->map(function ($group, $percentage) {
                return [
                    'percentage' => $this->formatPercentage($percentage),
                    'qty' => $group->count(),
                ];
            })
            ->values()
            ->toArray();

        $this->vouchers = $vouchers;
        $this->countTotalNominal();
    }

    public function back(): void
    {
        $this->redirect(route('campaign'), navigate: true);
    }

    // public function searchDealer(string $value = '')
    // {
    //     $selectedOption = Dealer::where('id', $this->dealer_searchable_id)->get();

    //     $this->dealersSearchable = Dealer::query()
    //         ->where('name', 'like', "%{$value}%")
    //         ->orWhere('code', 'like', "%{$value}%")
    //         ->orderBy('name')
    //         ->get()
    //         ->merge($selectedOption);
    // }

    public function countTotalNominal(): void
    {
        $this->total = (int) collect($this->vouchers)->sum('qty');

        $this->dispatch('$refresh');
    }

    public function addVoucher(): void
    {
        $this->vouchers[] = ['percentage' => '', 'qty' => ''];
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

                $newVoucherData = $vouchers->mapWithKeys(function ($item) {
                    $key = number_format((float) $item['percentage'], 2); // Normalize key
                    return [$key => (int) $item['qty']];
                });

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
                $incomingPercentages = $newVoucherData->keys()->toArray();
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
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($vouchers as $index => $voucher)
                            <tr>
                                <td class="px-4 py-2 ">
                                    <x-input
                                        class="w-full"
                                        wire:model.live="vouchers.{{ $index }}.percentage"
                                    />
                                </td>
                                <td class="px-2 py-2 ">
                                    <x-input
                                        type="number"
                                        class="w-full"
                                        wire:model.live="vouchers.{{ $index }}.qty"
                                        @change="$wire.countTotalNominal()"
                                    />
                                </td>
                                <td class="px-4 py-2  text-right">
                                    <x-button
                                        icon="o-trash"
                                        @click="$wire.deleteVoucher({{ $index }})"
                                        spinner="deleteVoucher({{ $index }})"
                                    />
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
        <x-slot:actions>
            <x-button label="Save" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</div>
