<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Discount;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

new class extends Component {
    use Toast, ManageDatas, WithPagination;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 10;

    public Collection $names;

    //var
    public string $name = '';
    public string $percentage = '';
    public string $start_date = '';
    public string $end_date = '';
    public bool $status = true;
    public array $varDiscount = ['recordId', 'name', 'percentage', 'start_date', 'end_date', 'status'];

    public function mount(): void
    {
        $this->searchNameDiscount();
    }

    public function searchNameDiscount(string $value = '')
    {
        $options = collect([
            ['id' => 'Biduk', 'name' => 'Biduk'],
            ['id' => 'Cildren', 'name' => 'Cildren'],
        ]);

        $selectedOption = $options->firstWhere('id', $this->name);

        $this->names = $options
            ->filter(fn ($item) => str_contains(strtolower($item['name']), strtolower($value)))
            ->when($selectedOption, fn ($collection) => $collection->prepend($selectedOption))
            ->unique('id')
            ->values();
    }

    public function save(): void
    {
        $this->setModel(new Discount());

        if($this->recordId == null) {
            $exists = Discount::query()
            ->where('name', $this->name)
            ->where('start_date', '<=', $this->end_date)
            ->where('end_date', '>=', $this->start_date)
            ->exists();

            if ($exists) $this->error('The discount period already exists'); return;
        }

        $this->saveOrUpdate(
            validationRules: [
                'name' => 'required|string|max:255',
                'percentage' => 'required|numeric',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
            ],
        );

        $this->reset($this->varDiscount);
        $this->unsetModel();
        $this->drawer = false;
    }

    public function delete(): void
    {
        $this->setModel(new Discount());

        $this->deleteData();
        $this->reset($this->varDiscount);
        $this->unsetModel();
        $this->unsetRecordId();
        $this->modalAlertDelete = false;
        $this->drawer = false;
    }

    public function datas(): LengthAwarePaginator
    {
        return Discount::query()
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'name', 'label' => 'Name'],
            ['key' => 'percentage', 'label' => 'Percentage'],
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

@push('scripts')
    <script>
        window.formatDiscount = function(value) {
            if (typeof value === 'string') {
                value = Number(value);
            }

            return Number.isInteger(value) ? value.toString() : value.toString().replace(/\.?0+$/, '');
        }
    </script>
@endpush

@script
    <script>
        $js('create', () => {
            $wire.recordId = null;
            $wire.name = '';
            $wire.percentage = '';
            $wire.start_date = '';
            $wire.end_date = '';
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
        })

        $js('detail', (discount) => {
            $wire.recordId = discount.id;
            $wire.name = discount.name;
            $wire.percentage = window.formatDiscount(discount.percentage);
            $wire.start_date = discount.start_date;
            $wire.end_date = discount.end_date;
            $wire.status = discount.status;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Discounts" separator>
        <x-slot:actions>
            @can('discount-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination @row-click="$js.detail($event.detail)">
            @scope('cell_percentage', $data)
                <p>{{ floatval($data['percentage']) }}%</p>
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        {{-- @if ($this->selected)
            <div class="flex justify-end items-center gap-2">
                @can('post-delete')
                    <div class="mt-3 flex justify-end">
                        <x-button label="Hapus" icon="o-trash" wire:click="modalAlertDelete = true" spinner
                            class="text-red-500" wire:loading.attr="disabled" />
                    </div>
                @endcan
                <div class="mt-3 flex justify-end">
                    <x-button label="Change Status" icon="o-arrow-path-rounded-square"
                        wire:click="modalAlertWarning = true" spinner class="text-blue-500"
                        wire:loading.attr="disabled" />
                </div>
            </div>
        @endif --}}
    </x-card>

    <!-- DRAWER CREATE -->
    @include('livewire.back-end.discount-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    {{-- @include('livewire.modals.modal-upload-file') --}}
</div>
