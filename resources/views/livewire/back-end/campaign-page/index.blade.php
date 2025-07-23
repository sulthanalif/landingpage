<?php

use App\Models\Campaign;
use Mary\Traits\Toast;
// use App\Models\BudgetPeriod;
// use App\Traits\LogFormatter;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
// use App\Traits\CreateOrUpdate;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Campaign')] class extends Component {
    use Toast, WithPagination, WithFileUploads;

    public string $search = '';

    public bool $modal = false;
    public bool $upload = false;

    public int $perPage = 10;
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public ?UploadedFile $file = null;

    // public ?int $dealer_sarchable_id = null;
    // public string $start_date = '';
    // public string $end_date = '';
    // public string $budget = '';
    // public bool $status = true;
    // public array $varBudgetPeriod = ['recordId', 'dealer_sarchable_id', 'start_date', 'end_date', 'budget', 'status'];

    // public Collection $dealersSearchable;

    // public function mount(): void
    // {
    //     $this->searchDealer();
    // }

    public function create(): void
    {
        $this->redirect(route('campaign.form'), navigate: true);
    }

    public function edit($budgetPeriodCode): void
    {
        $this->redirect(route('campaign.form', ['id' => $budgetPeriodCode]), navigate: true);
    }

    public function voucherClaims(): void
    {
        $this->redirect(route('voucher-claims'), navigate: true);
    }

      public function updatedPerPage(): void
    {
        $this->resetPage();
    }  
   public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function datas(): LengthAwarePaginator
    {
        return Campaign::query()
            ->where('name', 'like', "%{$this->search}%")
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'name', 'label' => 'Name'],
            ['key' => 'start_date', 'label' => 'Start Date'],
            ['key' => 'end_date', 'label' => 'End Date'],
            ['key' => 'status', 'label' => 'Status'],
            ['key' => 'created_at', 'label' => 'Created At'],
        ];
    }

    public function with(): array
    {
        return [
            'datas' => $this->datas(),
            'headers' => $this->headers(),
        ];
    }

}; ?>

{{-- @script
    <script>
        $js('upload', () => {
            $wire.file = null;
            $wire.upload = true;
        })
    </script>
@endscript --}}


<div>
     <!-- HEADER -->
    <x-header title="Campaign" separator>
        <x-slot:actions>
                <x-button label="Voucher Claims" @click="$wire.voucherClaims"  responsive spinner='voucherClaims'/>
            @can('campaign-create')
                <x-button label="Create" @click="$wire.create" responsive icon="o-plus" spinner='create' />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-4" shadow>
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[10, 25, 50, 100]"
            with-pagination @row-click="$wire.edit($event.detail.id)">
            @scope('cell_start_date', $data)
                <p>{{ \Carbon\Carbon::parse($data->start_date)->locale('id_ID')->isoFormat('D MMMM Y') }}</p>
            @endscope
            @scope('cell_end_date', $data)
                <p>{{ \Carbon\Carbon::parse($data->end_date)->locale('id_ID')->isoFormat('D MMMM Y') }}</p>
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            {{-- @scope('actions', $data)
                <div class="flex gap-2">
                    <x-button icon="fas.pencil" @click="$wire.edit({{ $data->id }})"
                        class="btn-ghost btn-sm text-primary" spinner="edit({{ $data->id }})" />
                </div>
            @endscope --}}
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>

        {{-- @if ($selected)
            <div class="flex justify-end gap-2 mx-4 my-2">
                <x-button label="Delete" wire:click="delete" wire:confirm="Are you sure?"
                    spinner class=" btn-sm text-error" />
            </div>
        @endif --}}
    </x-card>
</div>
