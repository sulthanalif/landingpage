<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Activity;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Activities')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads;

    public array $config = [
        'guides' => true,
        'aspectRatio' => 3/4, // Set to portrait ratio (3:4)
        'viewMode' => 1,
        'responsive' => true,
        'dragMode' => 'move',
        'cropBoxMovable' => true,
        'cropBoxResizable' => true,
    ];

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

    //varActivity
    public string $label = '';
    public string $date = '';
    public string $description = '';
    public string $category = 'foto';
    public ?UploadedFile $image = null;
    public string $oldImage = 'img/upload.png';
    public bool $status = true;

    public array $varActivity = ['recordId', 'label', 'date', 'image', 'oldImage', 'status', 'description', 'category'];

    //select status
    public array $selectStatus = [['id' => true, 'name' => 'Aktif'], ['id' => false, 'name' => 'Tidak aktif']];

    public function show(Activity $activity): void
    {
        $this->redirect(route('activity.show', $activity), navigate: true);
    }


    public function save(): void
    {
        $this->setModel(new Activity());

        $this->saveOrUpdate(
            validationRules: [
                'label' => ['required', 'string', 'max:255'],
                // 'date' => ['required', 'date'],
                'status' => ['required', 'boolean'],
                'description' => ['required', 'string'],
                // 'category' => ['required', 'in:foto,video'],
                'image' => [$this->recordId ? 'nullable' : 'required', 'mimes:jpeg,png,jpg,mp4', 'max:50400']
            ],

            beforeSave: function ($activity, $component) {
                if ($component->image) {
                    if (Storage::disk('public')->exists($component->image)) {
                        Storage::disk('public')->delete($component->image);
                    }

                    $activity->image = $component->image->store(path: 'files/activity', options: 'public');
                }
            }
        );

        $this->reset($this->varActivity);
        $this->unsetModel();
        $this->drawer = false;
    }


    public function delete(): void
    {
        $this->setModel(new Activity());

        $this->deleteData(
            beforeDelete: function ($id, $component) {
                $activity = Activity::find($id);
                if ($activity->image) {
                    Storage::disk('public')->delete($activity->image);
                }
            },
        );
        $this->unsetModel();
        $this->reset($this->varActivity);
        $this->unsetRecordId();
        $this->modalAlertDelete = false;
        $this->drawer = false;
    }

    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function datas(): LengthAwarePaginator
    {
        return Activity::query()
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
            // ['key' => 'category', 'label' => 'Category'],
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
        const previewImage = document.getElementById('previewImage');

        $js('create', () => {
            previewImage.src = '/' + $wire.oldImage;
            $wire.recordId = null;
            $wire.label = '';
            // $wire.date = '';
            $wire.description = '';
            // $wire.category = 'foto';
            $wire.image = null;
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
        });

        $js('detail', (activity) => {
            previewImage.src = '/storage/' + activity.image;
            $wire.recordId = activity.id;
            $wire.label = activity.label;
            // $wire.date = activity.date;
            $wire.description = activity.description;
            // $wire.category = activity.category;
            $wire.image = null;
            $wire.status = activity.status;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Activities" separator>
        <x-slot:actions>
            @can('activity-create')
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
            with-pagination>
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            @scope('actions', $data)
                <div class="flex gap-2">
                    <x-button icon="o-pencil" class="btn-sm" wire:click="$js.detail({{ $data }})" />
                    <x-button icon="o-eye" class="btn-sm" wire:click="show({{ $data->id }})"  spinner="show({{ $data->id }})"/>
                </div>
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        {{-- @if ($this->selected)
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
        @endif --}}
    </x-card>

    <!-- DRAWER CREATE -->
    @include('livewire.back-end.activity-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    {{-- @include('livewire.modals.modal-upload-file') --}}
</div>
