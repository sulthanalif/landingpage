<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Calendar;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Illuminate\Pagination\LengthAwarePaginator;

new class extends Component {
    use Toast, WithPagination, ManageDatas;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;
    public bool $flip = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    //var
    public string $label = '';
    public string $description = '';
    public string $css = '';
    public string $start_date = '';
    public string $end_date = '';
    public bool $status = true;
    public array $varCalendar = ['recordId', 'label', 'description', 'css', 'start_date', 'end_date', 'status'];

    public function datas(): LengthAwarePaginator
    {
        return Calendar::query()
            ->where(function ($query) {
                $query->where('label', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'label', 'label' => 'Label'],
            ['key' => 'description', 'label' => 'Description'],
            ['key' => 'css', 'label' => 'CSS'],
            ['key' => 'start_date', 'label' => 'Start Date'],
            ['key' => 'end_date', 'label' => 'End Date'],
            ['key' => 'status', 'label' => 'Status'],
            ['key' => 'created_at', 'label' => 'Created At']
        ];
    }

    public function with(): array
    {
        return [
            'datas' => $this->datas(),
            'headers' => $this->headers(),
            'events' => [
                [
                    'label' => 'Business Travel',
                    'description' => 'Series A founding',
                    'css' => '!bg-red-200',
                    'range' => [
                        now()->startOfMonth()->addDays(12),
                        now()->startOfMonth()->addDays(19)
                    ]
                ],
            ],
        ];
    }
}; ?>

@script
    <script>
        $js('flip', () => {
            $wire.flip = !$wire.flip
        })
        $js('create', () => {
            $wire.recordId = null;
            $wire.label = '';
            $wire.description = '';
            $wire.css = '';
            $wire.start_date = '';
            $wire.end_date = '';
            $wire.status = true;
            $wire.drawer = true;
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Calendar" separator>
        <x-slot:actions>
            <div>
                <x-button @click="$js.flip" class="btn-primary" responsive
                    icon="o-calendar" />
            </div>
            @can('category-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <x-card class="mt-5" wire:show="flip">
        <div class="flex justify-center">
            <x-calendar :events="$events" months="3" weekend-highlight sunday-start />
        </div>
    </x-car>

    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            wire:model.live="selected" selectable with-pagination>
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            @scope('actions', $data)
                <x-button class="btn-primary btn-sm btn-ghost"><x-icon name="o-pencil" color="primary" @click="$wire.detail({{ $data['id'] }})" /></x-button>
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        @if ($this->selected)
            <div class="flex justify-end items-center gap-2">
                @can('category-delete')
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
        @endif
    </x-card>

    @include('livewire.back-end.calendar-page.create')
</div>
