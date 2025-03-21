<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Category;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Maatwebsite\Excel\Excel;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Categories')] class extends Component {
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

    //varCategory
    public string $name = '';
    public ?UploadedFile $file = null;
    public bool $status = true;
    public string $description = '';
    public array $varCategory = ['recordId', 'name', 'status', 'description', 'file'];

    //select status
    public array $selectStatus = [['id' => true, 'name' => 'Aktif'], ['id' => false, 'name' => 'Tidak aktif']];

    public function create(): void
    {
        $this->drawer = true;
        $this->reset($this->varCategory);
    }

    public function detail($id): void
    {
        $this->reset($this->varCategory);
        $sub = Category::find($id);
        $this->recordId = $sub->id;
        $this->name = $sub->name;
        $this->status = $sub->status;
        $this->description = $sub->description;
        $this->drawer = true;
    }

    public function modalUpload(): void
    {
        $this->upload = true;
        $this->reset('file');
    }

    public function downloadTemplate()
    {
        $file = public_path('templates/template-category.xlsx');

        if (!file_exists($file)) {
            $this->error('File tidak ditemukan', position: 'toast-bottom');
            return;
        }

        return Response::download($file);
    }

    public function import(): void
    {
        $this->validate([
            'file' => 'required|mimes:xlsx',
        ]);

        try {
            Excel::import(new CategoryImport(), $this->file);

            $this->upload = false;
            $this->reset('file');
            $this->success('Data berhasil diupload', position: 'toast-bottom');
        } catch (\Exception $e) {
            $this->error('Data gagal diupload', position: 'toast-bottom');
            Log::channel('debug')->error("message: {$e->getMessage()}  file: {$e->getFile()}  line: {$e->getLine()}");
        }
    }

    public function export()
    {
        $datas = Category::all();
        $datas = $datas->map(function ($Category) {
            return [
                'name' => $Category->name,
                'status' => $Category->status == true ? 'Aktif' : 'Tidak aktif',
                'created_at' => $Category->created_at->format('Y-m-d'),
            ];
        });

        $headers = ['NAMA', 'STATUS', 'DIBUAT PADA'];

        return Excel::download(new ExportDatas($datas, 'Data Category', $headers), 'category_' . date('Y-m-d') . '.xlsx');
    }

    public function save(): void
    {
        $this->setModel(new Category());

        $this->saveOrUpdate(
            validationRules: [
                'name' => 'required|string|max:255',
                'status' => 'required|boolean',
                'description' => 'nullable|string|max:500',
            ],

            beforeSave: function ($sub, $component) {
                $sub->name = $component->name;
                $sub->status = $component->status;
                $sub->description = $component->description;
            },
        );

        $this->unsetModel();
        $this->reset($this->varCategory);
        $this->drawer = false;
    }

    public function changeStatus(): void
    {
        foreach ($this->selected as $id) {
            $sub = Category::find($id);
            try {
                DB::beginTransaction();
                $sub->status = !$sub->status;
                $sub->save();
                DB::commit();

                $this->success('Status berhasil diubah', position: 'toast-bottom');
                $this->modalAlertWarning = false;
                $this->reset('selected');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::channel('debug')->error("message: '{$e->getMessage()}',  file: '{$e->getFile()}',  line: {$e->getLine()}");
            }
        }
    }

    public function delete(): void
    {
        $this->setModel(new Category());

        foreach ($this->selected as $id) {
            $this->setRecordId($id);
            $this->deleteData();
        }

        $this->reset('selected');
        $this->unsetRecordId();
        $this->unsetModel();
        $this->modalAlertDelete = false;
    }

    public function datas(): LengthAwarePaginator
    {
        return Category::query()
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [['key' => 'name', 'label' => 'Name'], ['key' => 'description', 'label' => 'Description', 'sortable' => false], ['key' => 'status', 'label' => 'Status'], ['key' => 'created_at', 'label' => 'Created At']];
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
    <x-header title="Categories" separator>
        <x-slot:actions>
            <div>
                <x-button label="Upload" @click="$wire.modalUpload" class="!btn-primary" responsive
                    icon="o-arrow-up-tray" />
            </div>
            <div>
                <x-button label="Download" @click="$wire.export" class="!btn-primary" responsive icon="o-arrow-down-tray"
                    spinner='export' />
            </div>
            @can('category-create')
                <x-button label="Create" @click="$wire.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            wire:model.live="selected" selectable with-pagination>
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            @scope('actions', $data)
                <x-button class="btn-primary btn-sm btn-ghost"><x-icon name="o-pencil" color="primary" @click="$wire.detail({{ $data['id'] }})" /></x-button>
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

    <!-- DRAWER CREATE -->
    @include('livewire.back-end.category-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file')
</div>
