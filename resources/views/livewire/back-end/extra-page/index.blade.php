<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use App\Models\Extracurricular;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Extracurricular')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads;

    public string $search = '';

    public array $config = [
        'guides' => false,
        'aspectRatio' => 4/3, // Set to landscape ratio (4:3)
        'viewMode' => 1,
        'responsive' => true,
        'dragMode' => 'move',
        'cropBoxMovable' => true,
        'cropBoxResizable' => true,
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
    public string $name = '';
    public string $description = '';
    public ?UploadedFile $image = null;
    public string $oldImage = 'img/upload.png';
    public bool $status = true;
    public array $varExtra = ['recordId', 'name', 'description', 'image', 'status'];

    public function save(): void
    {
        $this->setModel(new Extracurricular());

        $this->saveOrUpdate(
            validationRules: [
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'image' => [$this->recordId ? 'nullable' : 'required', 'mimes:jpeg,png,jpg', 'max:10240'],
                'status' => ['required', 'boolean'],
            ],
            beforeSave: function ($extra, $component) {
                if ($component->image) {
                    if (Storage::disk('public')->exists($component->image)) {
                        Storage::disk('public')->delete($component->image);
                    }

                    $extra->image = $component->image->store(path: 'images/extra', options: 'public');
                }
            }
        );

        $this->unsetModel();
        $this->drawer = false;
    }

    public function delete(): void
    {
        $this->setModel(new Extracurricular());

        $this->deleteData(
            beforeDelete: function ($post, $component) {
                $this->deleteImage($component->image);
            },
        );
        $this->unsetModel();
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
        return Extracurricular::query()
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'image', 'label' => 'Image'],
            ['key' => 'name', 'label' => 'Name'],
            ['key' => 'description', 'label' => 'Description'],
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
            $wire.name = '';
            $wire.description = '';
            document.getElementById('previewImage').src = '/' + $wire.oldImage;
            $wire.image = null;
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
        })

        $js('detail', (extra) => {
            $wire.recordId = extra.id;
            $wire.name = extra.name;
            $wire.description = extra.description;
            $wire.image = null;
            document.getElementById('previewImage').src = '/storage/' + extra.image;
            $wire.status = extra.status;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Extracurricular" separator>
        <x-slot:actions>
            @can('extra-create')
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

    <!-- DRAWER CREATE -->
    @include('livewire.back-end.extra-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    {{-- @include('livewire.modals.modal-upload-file') --}}
</div>
