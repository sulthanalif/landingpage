<?php

use App\ManageDatas;
use App\Models\Post;
use Mary\Traits\Toast;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Posts')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    public ?UploadedFile $file = null;

    public function detail($slug): void
    {
        $this->redirect(route('post.form', ['url_slug' => $slug]), navigate: true);
    }

    public function datas(): LengthAwarePaginator
    {
        return Post::query()
            ->with('category', 'user')
            ->where(function ($query) {
                $query->where('title', 'like', "%{$this->search}%")
                    ->orWhere('sub_title', 'like', "%{$this->search}%")
                    ->orWhere('slug', 'like', "%{$this->search}%");
            })
            ->whereHas('category', function ($query) {
                $query->where('name', 'like', "%{$this->search}%");
            })
            ->whereHas('user', function ($query) {
                $query->where('name', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'title', 'label' => 'Title'],
            ['key' => 'category.name', 'label' => 'Category'],
            ['key' => 'user.name', 'label' => 'User'],
            ['key' => 'body', 'label' => 'Body'],
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
    <x-header title="Posts" separator>
        <x-slot:actions>
            {{-- <div>
                <x-button label="Upload" @click="$wire.modalUpload" class="!btn-primary" responsive
                    icon="o-arrow-up-tray" />
            </div>
            <div>
                <x-button label="Download" @click="$wire.export" class="!btn-primary" responsive icon="o-arrow-down-tray"
                    spinner='export' />
            </div> --}}
            @can('post-create')
                <x-button label="Create" link="{{ route('post.form') }}" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination @row-click="$wire.detail($event.detail.slug)">
            @scope('cell_body', $data)
                {{ Str::limit(strip_tags($data['body']), 25) }}
            @endscope
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
        @if ($this->selected)
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
        @endif
    </x-card>

    <!-- DRAWER CREATE -->
    {{-- @include('livewire.back-end.Post-page.create') --}}

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file')
</div>
