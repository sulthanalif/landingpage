<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\WhyChooseUs;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Why Choose Us')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads;

    public string $search = '';

    public array $config = [
        'guides' => false,
        'aspectRatio' => 1,
    ];

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
    public string $description = '';
    public ?UploadedFile $icon = null;
    public string $oldImage = 'img/upload.png';
    public bool $status = true;
    public array $varWcu = ['recordId', 'title', 'description', 'icon', 'status'];

    public function save(): void
    {

        $this->setModel(new WhyChooseUs());

        $this->saveOrUpdate(
            validationRules: [
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'icon' => $this->recordId ? 'nullable' : 'required'.'|image|mimes:jpeg,png,jpg,webp|max:2048',
                'status' => 'required|boolean',
            ],
            beforeSave: function ($wcu, $component) {
                if ($component->icon) {
                    if (Storage::disk('public')->exists($component->icon)) {
                        Storage::disk('public')->delete($component->icon);
                    }

                    $wcu->icon = $component->icon->store(path: 'images/wcu', options: 'public');
                }
            }
        );

        $this->unsetModel();
        $this->reset($this->varWcu);
        $this->drawer = false;
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
        return WhyChooseUs::query()
            ->where(function ($query) {
                $query->where('title', 'like', "%{$this->search}%")
                    ->orWhere('description', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function delete(): void
    {
        $this->setModel(new WhyChooseUs());
        $this->deleteData(
            beforeDelete: function ($id, $component) {
                $wcu = WhyChooseUs::find($id);
                if (Storage::disk('public')->exists($wcu->icon)) {
                    Storage::disk('public')->delete($wcu->icon);
                }
            }
        );
        $this->reset($this->varWcu);
        $this->unsetRecordId();
        $this->unsetModel();
        $this->modalAlertDelete = false;
        $this->drawer = false;
    }

    public function headers(): array
    {
        return [
            ['key' => 'title', 'label' => 'Title'],
            ['key' => 'description', 'label' => 'Description'],
            ['key' => 'icon', 'label' => 'Icon'],
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

@script
    <script>
        $js('create', () => {
            $wire.recordId = null;
            $wire.title = '';
            $wire.description = '';
            $wire.icon = null;
            $wire.status = true;
            document.getElementById('previewImage').src = '/' + $wire.oldImage;
            $wire.drawer = true;
            $wire.$refresh();
        })
        $js('detail', (wcu) => {
            $wire.recordId = wcu.id;
            $wire.title = wcu.title;
            $wire.description = wcu.description;
            $wire.icon = null;
            $wire.status = wcu.status;
            document.getElementById('previewImage').src = '/storage/' + wcu.icon;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Why Choose Us" separator>
        <x-slot:actions>
            @can('wcu-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
             with-pagination @row-click="$js.detail($event.detail)">
            @scope('cell_icon', $data)
                <img src="{{ asset('storage/' . $data['icon']) }}" alt="" style="width: 100px; height: auto">
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
    @include('livewire.back-end.wcu-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file')
</div>
