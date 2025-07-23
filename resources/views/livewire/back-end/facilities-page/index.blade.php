<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Facility;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Facility')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads;

    public string $search = '';

    public array $config = [
        'guides' => true,
        'aspectRatio' => 1,
    ];

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    //var
    public string $title = '';
    public string $oldImage = 'img/upload.png';
    public string $description = '';
    public ?UploadedFile $image = null;
    public bool $status = true;

    public function save(): void
    {
        $this->setModel(new Facility());

        $rules = [
            'title' => 'required',
            'description' => 'required',
        ];

        if ($this->recordId) {
            $rules['image'] = 'nullable|image|max:2048';
        } else {
            $rules['image'] = 'required|image|max:2048';
        }

        $this->saveOrUpdate(
            validationRules: $rules,
            beforeSave: function ($teacher, $component) {
                if ($component->image) {
                    if (Storage::disk('public')->exists($component->image)) {
                        Storage::disk('public')->delete($component->image);
                    }

                    $teacher->image = $component->image->store(path: 'images', options: 'public');
                }
            },
        );

        $this->reset(['drawer', 'title', 'description', 'image', 'status', 'oldImage']);
        $this->unsetModel();
        $this->unsetRecordId();
    }

    public function delete(): void
    {
        $this->setModel(new Facility());

        $this->deleteData(
            beforeDelete: function ($id, $component) {
                $facility = Facility::find($id);
                if ($facility->image) {
                    Storage::disk('public')->delete($facility->image);
                }
            },
        );

        $this->reset('recordId');
        $this->unsetModel();
        $this->modalAlertDelete = false;
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
        return Facility::query()
            ->where(function ($query) {
                $query->where('title', 'like', '%' . $this->search . '%')
                    ->orWhere('description', 'like', '%' . $this->search . '%');
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'title', 'label' => 'Title'],
            ['key' => 'description', 'label' => 'Description'],
            ['key' => 'image', 'label' => 'Image'],
            ['key' => 'status', 'label' => 'Status'],
            ['key' => 'created_at', 'label' => 'Created At'],
        ];
    }

    public function with(): array
    {
        return [
            'headers' => $this->headers(),
            'datas' => $this->datas(),
        ];
    }
}; ?>

@script
    <script>
        $js('create', () => {
            $wire.recordId = '';
            $wire.title = '';
            $wire.description = '';
            $wire.oldImage = 'img/upload.png';
            $wire.image = null;
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
            document.getElementById('previewImage').src = '/' + $wire.oldImage;
            // console.log($wire.image, $wire.oldImage);
        })

        $js('detail', (facility) => {
            $wire.recordId = facility.id;
            $wire.title = facility.title;
            $wire.description = facility.description;
            document.getElementById('previewImage').src = '/storage/' + facility.image;
            $wire.image = null;
            // $wire.oldImage = facility.image;
            // $wire.image = facility.image;
            $wire.status = facility.status;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Facilities" separator>
        <x-slot:actions>
            @can('facility-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" x-on:click="$wire.$refresh()" />
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
            @scope('cell_image', $data)
                <img src="{{ asset('storage/' . $data['image']) }}" alt="" style="width: 100px; height: auto">
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
    </x-card>

    <x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Activity" right separator
        with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

        <x-form wire:submit="save">

            <div>
                <x-input label="Title" type="text" wire:model="title" />
            </div>

            <div>
                <x-textarea label="Description" wire:model="description" rows='3' />
            </div>

            <div>
                <x-file label='Image' wire:model="image" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
                change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
                crop-save-text="Crop" :crop-config="$config" hint="image size max 5mb">
                    <img id="previewImage" src="{{ asset($oldImage ?? 'img/upload.png') }}" class="h-40 rounded-lg"  />
                </x-file>
            </div>

            <div class="my-3">
                <x-toggle label="Status" wire:model="status" hint="if checked, status will be active" />
            </div>

            <x-slot:actions>
                @if ($this->recordId != null)
                <x-button label="Delete" icon="o-trash" class="btn-error" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
                @endif
                <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary"
                    type="submit" spinner="save" />
            </x-slot:actions>
        </x-form>

    </x-drawer>

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')
</div>
