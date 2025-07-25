<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use App\Models\Accreditation;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Accreditation')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;
    public bool $flip = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'order', 'direction' => 'asc'];
    public int $perPage = 10;

    //var
    public string $title = '';
    public string $description = '';
    public ?UploadedFile $file = null;
    public int $order = 0;
    public bool $status = true;
    public array $varAccreditation = ['recordId', 'title', 'description', 'file', 'status'];

    public function downloadFile()
    {
        $file = public_path('storage/' . Accreditation::find($this->recordId)->file);

        if (!file_exists($file)) {
            $this->error('File tidak ditemukan', position: 'toast-bottom');
        } else {
            return response()->download($file);
        }
    }

    public function mount()
    {
        $this->getOrder();
    }

    public function getOrder()
    {
        $acre = Accreditation::query()
            ->orderBy('order', 'desc')
            ->first();

        $count = $acre ? (int)$acre->order + 1 : 1;

        $this->order = $count;
    }

    public function save(): void
    {
        $this->setModel(new Accreditation());

        $this->saveOrUpdate(
            validationRules: [
                'title' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'order' => ['required', 'numeric', 'min:1'],
                'file' => [$this->recordId ? 'nullable' : 'required', 'mimes:jpeg,png,jpg', 'max:2048'],
                'status' => ['required', 'boolean'],
            ],

            beforeSave: function ($accreditation, $component) {
                if ($component->file) {
                    if (Storage::disk('public')->exists($component->file)) {
                        Storage::disk('public')->delete($component->file);
                    }

                    $accreditation->file = $component->file->store(path: 'files/accreditation', options: 'public');
                }
            }
        );

        $this->reset($this->varAccreditation);
        $this->unsetModel();
        $this->drawer = false;
    }

    public function delete(): void
    {
        $this->setModel(new Accreditation());

        $this->deleteData(
            beforeDelete: function ($id, $component) {
                $accreditation = Accreditation::find($id);
                if (Storage::disk('public')->exists($accreditation->file)) {
                    Storage::disk('public')->delete($accreditation->file);
                }
            }
        );

        $this->reset($this->varAccreditation);
        $this->selected = [];
        $this->unsetModel();
        $this->modalAlertDelete = false;
        $this->drawer = false;
        $this->success('Data berhasil dihapus', position: 'toast-bottom');
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
        return Accreditation::query()
            ->where(function ($query) {
                $query->where('title', 'like', "%{$this->search}%")
                    ->orWhere('description', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'order', 'label' => 'Order'],
            ['key' => 'title', 'label' => 'Title'],
            ['key' => 'description', 'label' => 'Description'],
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
            $wire.getOrder();
            $wire.file = null;
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
        })
        $js('detail', (accreditation) => {
            $wire.recordId = accreditation.id;
            $wire.title = accreditation.title;
            $wire.description = accreditation.description;
            $wire.file = null;
            $wire.order = accreditation.order;
            $wire.status = accreditation.status == 1;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Accreditation" separator>
        <x-slot:actions>
            @can('accreditation-create')
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
    @include('livewire.back-end.accreditation-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    {{-- @include('livewire.alerts.alert-warning') --}}

    {{-- <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file') --}}
</div>
