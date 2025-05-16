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
        'guides' => false,
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
    public string $title = '';
    public string $date = '';
    public ?UploadedFile $file = null;
    public bool $status = true;

    public array $varActivity = ['recordId', 'title', 'date', 'file', 'status'];

    //select status
    public array $selectStatus = [['id' => true, 'name' => 'Aktif'], ['id' => false, 'name' => 'Tidak aktif']];


    public function save(): void
    {
        $this->setModel(new Activity());

        $this->saveOrUpdate(
            validationRules: [
                'title' => ['required', 'string', 'max:255'],
                'date' => ['required', 'date'],
                'status' => ['required', 'boolean'],
                'file' => ['required', 'mimes:jpeg,png,jpg,mp4', 'max:50400']
            ],

            beforeSave: function ($activity, $component) {
                if ($component->file) {
                    if (Storage::disk('public')->exists($component->file)) {
                        Storage::disk('public')->delete($component->file);
                    }

                    $activity->file = $component->file->store(path: 'files/activity', options: 'public');
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
                if ($activity->file) {
                    Storage::disk('public')->delete($activity->file);
                }
            },
        );
        $this->unsetModel();
        $this->reset($this->varActivity);
        $this->unsetRecordId();
        $this->modalAlertDelete = false;
        $this->drawer = false;
    }

    public function downloadFile()
    {
        $file = public_path('storage/' . Activity::find($this->recordId)->file);

        if (!file_exists($file)) {
            $this->error('File tidak ditemukan', position: 'toast-bottom');
        } else {
            return response()->download($file);
        }
    }

    public function datas(): LengthAwarePaginator
    {
        return Activity::query()
            ->where(function ($query) {
                $query->where('title', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [['key' => 'title', 'label' => 'Title'], ['key' => 'date', 'label' => 'Date'], ['key' => 'status', 'label' => 'Status'], ['key' => 'created_at', 'label' => 'Created At']];
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
            $wire.date = '';
            $wire.file = null;
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
        });

        $js('detail', (activity) => {
            $wire.recordId = activity.id;
            $wire.title = activity.title;
            $wire.date = activity.date;
            $wire.file = null;
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
            {{-- <div>
                <x-button label="Upload" @click="$wire.modalUpload" class="!btn-primary" responsive
                    icon="o-arrow-up-tray" />
            </div>
            <div>
                <x-button label="Download" @click="$wire.export" class="!btn-primary" responsive icon="o-arrow-down-tray"
                    spinner='export' />
            </div> --}}
            @can('activity-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" x-on:click="$wire.$refresh()" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination @row-click="$js.detail($event.detail)">
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
