<?php

use Mary\Traits\Toast;
use App\Models\DynamicTable;
use Livewire\Volt\Component;
use App\Models\TitleTuitionFee;
use Illuminate\Pagination\LengthAwarePaginator;

new class extends Component {
    use Toast;

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
    public int $perPage = 10;

    //var
    public string $title = '';

    public function mount(): void
    {
        $this->title = TitleTuitionFee::first()->value;
    }

    public function create(): void
    {
        $this->redirect(route('tuition-fees.form'), navigate: true);
    }

    public function detail(DynamicTable $dynamicTable): void
    {
        $this->redirect(route('tuition-fees.detail', $dynamicTable->slug), navigate: true);
    }

    public function saveTitle(): void
    {
        $title = TitleTuitionFee::first();
        $title->value = $this->title;
        $title->save();
        $this->success('Title saved successfully', position: 'toast-bottom');
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
        return DynamicTable::query()
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%")
                    ->orWhere('slug', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'slug', 'label' => 'Slug'],
            ['key' => 'name', 'label' => 'Table Name'],
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

<div>
    <!-- HEADER -->
    <x-header title="Tuition Fees" separator>
        <x-slot:actions>
            @can('tuition-fees-create')
                <x-button label="Create" @click="$wire.create" responsive icon="o-plus" spinner="create" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-between items-center gap-5">
        <div >
            <x-form wire:submit='saveTitle'>
                <div class="flex items-center gap-2 ">
                    {{-- Input akan mengisi ruang kosong --}}
                    <x-input placeholder="Title..." wire:model="title" class="w-[600px]" />

                    {{-- Tombol ukurannya otomatis (sesuai label) --}}
                    <x-button label="Save" class="btn-primary whitespace-nowrap" type="submit" spinner="saveTitle" />
                </div>
            </x-form>
        </div>
        <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
             with-pagination @row-click="$wire.detail($event.detail)">
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            {{-- @scope('actions', $data)
                <x-button class="btn-primary btn-sm btn-ghost" link="{{ route('post.form', ['url_slug' => $data['slug']]) }}"><x-icon name="o-pencil" color="primary" /></x-button>
            @endscope --}}
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
    {{-- @include('livewire.back-end.accreditation-page.create') --}}

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')
</div>
