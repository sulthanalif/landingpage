<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Calendar;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Calendars')] class extends Component {
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
    // public string $css = '';
    public string $start_date = '';
    public string $end_date = '';
    public bool $status = true;
    public array $varCalendar = ['recordId', 'label', 'description', 'css', 'start_date', 'end_date', 'status'];

    // Selected option
    public ?string $css = null;
    public Collection $colorsSearchable;

    public function mount(): void
    {
        $this->searchColor();
    }

    public function searchColor(string $value = '')
    {
        $colors = collect([
            ['id' => 'red-200', 'name' => 'Red', 'code' => '#ef4444'],
            ['id' => 'green-200', 'name' => 'Green', 'code' => '#22c55e'],
            ['id' => 'blue-200', 'name' => 'Blue', 'code' => '#3b82f6'],
            ['id' => 'amber-200', 'name' => 'Amber', 'code' => '#f59e0b'],
            ['id' => 'cyan-200', 'name' => 'Cyan', 'code' => '#06b6d4'],
            ['id' => 'lime-200', 'name' => 'Lime', 'code' => '#84cc16'],
            ['id' => 'indigo-200', 'name' => 'Indigo', 'code' => '#6366f1'],
            ['id' => 'pink-200', 'name' => 'Pink', 'code' => '#ec4899'],
            ['id' => 'teal-200', 'name' => 'Teal', 'code' => '#14b8a6'],
            ['id' => 'rose-200', 'name' => 'Rose', 'code' => '#f43f5e'],
            ['id' => 'gray-200', 'name' => 'Gray', 'code' => '#9ca3af'],
            ['id' => 'zinc-200', 'name' => 'Zinc', 'code' => '#71717a'],
            ['id' => 'neutral-200', 'name' => 'Neutral', 'code' => '#737373'],
            ['id' => 'stone-200', 'name' => 'Stone', 'code' => '#78716c'],
        ]);

        $selectedOption = $colors->firstWhere('id', $this->css);

        $filtered = $colors->filter(function ($item) use ($value) {
            return str_contains(strtolower($item['name']), strtolower($value));
        })->values();

        $this->colorsSearchable = $filtered->when($selectedOption, fn ($col) => $col->push($selectedOption))->unique('id');

    }

    public function save(): void
    {
        $this->setModel(new Calendar());

        $this->saveOrUpdate(
            validationRules: [
                'label' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'css' => 'required|string|max:255',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'status' => 'required|boolean',
            ],
            beforeSave: function ($calendar, $component) {
                $calendar->code = $this->colorsSearchable->firstWhere('id', $component->css)['code'];
            },
            afterSave: function ($calendar, $component) {
                $component->drawer = false;
            }
        );
        $this->reset($this->varCalendar);
        $this->unsetModel();
    }

    public function delete(): void
    {
        $this->setModel(new Calendar());

        foreach ($this->selected as $id) {
            $this->setRecordId($id);
            $this->deleteData();
        }

        $this->reset('selected');
        $this->unsetRecordId();
        $this->unsetModel();
        $this->modalAlertDelete = false;
    }

    public function changeStatus(): void
    {
        $this->setModel(new Calendar());

        foreach ($this->selected as $id) {
            $this->setRecordId($id);
            $this->changeStatusData();
        }
        $this->reset('selected');
        $this->unsetModel();
        $this->modalAlertWarning = false;
    }

    public function datas(): LengthAwarePaginator
    {
        return Calendar::query()
            ->where(function ($query) {
                $query->where('label', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function events(): array
    {
        return Calendar::query()->get()->map(function ($calendar) {
            return [
                'label' => $calendar->label,
                'description' => $calendar->description,
                'css' => '!bg-'.$calendar->css,
                'range' => [
                    $calendar->start_date,
                    $calendar->end_date
                ],
            ];
        })->toArray();
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
            'events' => $this->events(),
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
        $js('detail', (calendar) => {
            $wire.recordId = calendar.id;
            $wire.label = calendar.label;
            $wire.description = calendar.description;
            $wire.css = calendar.css;
            $wire.start_date = calendar.start_date;
            $wire.end_date = calendar.end_date;
            $wire.status = calendar.status;
            $wire.drawer = true;
            $wire.$refresh();
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
            wire:model.live="selected" selectable with-pagination @row-click="$js.detail($event.detail)">
            @scope('cell_css', $data)
                <x-badge value="{{ $data['css'] }}" class="!bg-{{ $data['css'] }}" />
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            {{-- @scope('actions', $data)
                <x-button class="btn-primary btn-sm btn-ghost"><x-icon name="o-pencil" color="primary" @click="$wire.detail({{ $data['id'] }})" /></x-button>
            @endscope --}}
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
    @include('livewire.alerts.alert-delete')
    @include('livewire.alerts.alert-warning')
</div>
