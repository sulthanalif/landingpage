<?php

use Livewire\Volt\Component;
use Livewire\WithPagination;
use App\Models\CareerRegister;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Career Registration')] class extends Component {
    use WithPagination;

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

    public array $model;

    public function back(): void
    {
        $this->redirect(route('career'), navigate: true);
    }

    public function datas(): LengthAwarePaginator
    {
        $search = is_string($this->search) ? $this->search : '';

        return CareerRegister::query()
            ->withAggregate('career', 'title')
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('career', function ($query) use ($search) {
                        $query->where('title', 'like', "%{$search}%");
                    });
            })
            ->orderBy($this->sortBy['column'] ?? 'id', $this->sortBy['direction'] ?? 'asc')
            ->paginate($this->perPage ?? 10);
    }

    public function headers(): array
    {
        return [
            ['key' => 'name', 'label' => 'Name'],
            ['key' => 'email', 'label' => 'Email'],
            ['key' => 'phone', 'label' => 'Phone'],
            ['key' => 'career_title', 'label' => 'Career', 'sortable' => true],
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

@script
    <script>
        $js('detail', (register) => {
            $wire.model = register;
            console.log($wire.model);

            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Career Registration" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination @row-click="$js.detail($event.detail)">
            {{-- @scope('cell_percentage', $data)
                <p>{{ floatval($data['percentage']) }}%</p>
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope --}}
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
    </x-card>

    <x-modal wire:model="myModal"  box-class="w-12/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        Hello!
    </x-modal>
</div>
