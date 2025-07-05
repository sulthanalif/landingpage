<?php

use App\ManageDatas;
use App\Models\Color;
use Mary\Traits\Toast;
use App\Models\Calendar;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
    public array $varCalendar = ['recordId', 'label', 'description', 'color_id', 'start_date', 'end_date', 'status'];

    // Selected option
    public ?int $color_id = null;
    public Collection $categoriesSearchable;
    public Collection $colorsSearchable;

    public string $name = '';
    public ?string $color = null;

    public Collection $colors;

    public function mount(): void
    {
        $this->searchColor();
        $this->searchCategory();

        $this->colors = Color::all();
        $this->events();
    }

    public function searchCategory(string $value = '')
    {
        $selectedOptions = Color::where('id', $this->color_id)->get();

        $this->categoriesSearchable = Color::query()
            ->where('name', 'like', '%'.$value.'%')
            ->get()
            ->merge($selectedOptions);
    }

    public function searchColor(string $value = '')
    {
        $colors = collect([
            ['id' => 'bg-red-500', 'name' => 'Red', 'code' => '#ef4444'],
            ['id' => 'bg-green-500', 'name' => 'Green', 'code' => '#22c55e'],
            ['id' => 'bg-blue-500', 'name' => 'Blue', 'code' => '#3b82f6'],
            ['id' => 'bg-amber-500', 'name' => 'Amber', 'code' => '#f59e0b'],
            ['id' => 'bg-cyan-500', 'name' => 'Cyan', 'code' => '#06b6d4'],
            ['id' => 'bg-lime-500', 'name' => 'Lime', 'code' => '#84cc16'],
            ['id' => 'bg-indigo-500', 'name' => 'Indigo', 'code' => '#6366f1'],
            ['id' => 'bg-pink-500', 'name' => 'Pink', 'code' => '#ec4899'],
            ['id' => 'bg-teal-500', 'name' => 'Teal', 'code' => '#14b8a6'],
            ['id' => 'bg-rose-500', 'name' => 'Rose', 'code' => '#f43f5e'],
            ['id' => 'bg-gray-500', 'name' => 'Gray', 'code' => '#9ca3af'],
            ['id' => 'bg-zinc-500', 'name' => 'Zinc', 'code' => '#71717a'],
            ['id' => 'bg-neutral-500', 'name' => 'Neutral', 'code' => '#737373'],
            ['id' => 'bg-stone-500', 'name' => 'Stone', 'code' => '#78716c'],
        ]);

        $selectedOption = $colors->firstWhere('id', $this->color);

        $filtered = $colors->filter(function ($item) use ($value) {
            return str_contains(strtolower($item['name']), strtolower($value));
        })->values();

        $this->colorsSearchable = $filtered->when($selectedOption, fn ($col) => $col->push($selectedOption))->unique('id');

    }

    public function saveColor(): void
    {
        $this->validate([
            'name' => 'required|string|max:255',
            'color' => 'required',
        ]);

        try {
            DB::beginTransaction();

            Color::create([
                'name' => $this->name,
                'css' => $this->color,
                'code' => $this->colorsSearchable->firstWhere('id', $this->color)['code'],
            ]);

            DB::commit();

            $this->success('Category created successfully', position: 'toast-bottom');
            $this->reset('name', 'color');
            $this->colors = Color::all();
            $this->searchCategory();
        } catch (\Exception $th) {
            DB::rollBack();
            $this->error('Error creating category', position: 'toast-bottom');
            Log::channel('debug')->error($th->getMessage());
        }
    }

    public function save(): void
    {
        $this->setModel(new Calendar());

        $this->saveOrUpdate(
            validationRules: [
                'label' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'color_id' => 'required|integer',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'status' => 'required|boolean',
            ],
            afterSave: function ($calendar, $component) {
                $component->drawer = false;
            }
        );
        $this->reset($this->varCalendar);
        $this->unsetModel();
    }

    public function deleteColor($id): void
    {
        try {
            DB::beginTransaction();

            Color::query()->where('id', $id)->delete();

            DB::commit();

            $this->success('Category deleted successfully', position: 'toast-bottom');
            $this->colors = Color::all();
        } catch (\Exception $th) {
            DB::rollBack();
            $this->error('Error deleting Category', position: 'toast-bottom');
            Log::channel('debug')->error($th->getMessage());
        }
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
                'css' => '!'.$calendar->color->css,
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
            ['key' => 'css', 'label' => 'Category'],
            ['key' => 'color', 'label' => 'Color'],
            ['key' => 'start_date', 'label' => 'Start Date'],
            ['key' => 'end_date', 'label' => 'End Date'],
            ['key' => 'status', 'label' => 'Status'],
            // ['key' => 'created_at', 'label' => 'Created At']
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
            $wire.color_id = '';
            $wire.start_date = '';
            $wire.end_date = '';
            $wire.status = true;
            $wire.drawer = true;
        })
        $js('detail', (calendar) => {
            $wire.recordId = calendar.id;
            $wire.label = calendar.label;
            $wire.description = calendar.description;
            $wire.color_id = calendar.color_id;
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
            wire:model.live="selected" selectable with-pagination >
            @scope('cell_css', $data)
            <div class="">
                {{ $data->color->name }}
            </div>
            @endscope
            @scope('cell_color', $data)
            <div class="">
                <div class="w-4 h-4 rounded-full {{ $data->color->css }}"></div>
            </div>
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            @scope('actions', $data)
            <x-button icon="o-pencil" class="btn-sm" wire:click="$js.detail({{ $data }})" />
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
    @include('livewire.alerts.alert-delete')
    @include('livewire.alerts.alert-warning')
</div>
