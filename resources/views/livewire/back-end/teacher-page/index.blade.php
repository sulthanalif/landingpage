<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Teacher;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Teachers')] class extends Component {
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
    public array $sortBy = ['column' => 'order', 'direction' => 'asc'];
    public int $perPage = 5;

    //var
    public string $code_id = '';
    public string $name = '';
    public string $email = '';
    public string $category = 'Management';
    public string $description = '';
    public string $position = '';
    public ?string $notes = null;
    public int $order = 0;
    public bool $status = true;
    public ?\Illuminate\Http\UploadedFile $image = null;
    public ?\Illuminate\Http\UploadedFile $logo = null;
    public array $varTeacher = ['recordId', 'notes', 'code_id', 'name', 'email', 'category', 'status', 'image', 'logo', 'description'];
    public string $oldImage = 'img/upload.png';
    public string $oldLogo = 'img/upload.png';

    public function mount()
    {
        $this->getLast();
    }

    public function getLast(): void
    {
        $lastTeacher = Teacher::orderBy('order', 'desc')->first();
        $this->order = $lastTeacher ? $lastTeacher->order + 1 : 1;
    }

    public function save(): void
    {
        $this->setModel(new Teacher());

        $this->saveOrUpdate(
            validationRules: [
                'code_id' => ['required', 'string', 'unique:teachers,code_id' . ($this->recordId ? ',' . $this->recordId : '')],
                'name' => ['required', 'string'],
                'email' => ['required', 'string', 'email', 'unique:teachers,email' . ($this->recordId ? ',' . $this->recordId : '')],
                'category' => ['required', 'string'],
                'status' => ['required', 'boolean'],
                'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
                'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
                'description' => ['required', 'string', 'max:1000'],
                'position' => ['required', 'string'],
                'order' => ['required', 'integer', 'unique:teachers,order' . ($this->recordId ? ',' . $this->recordId : '')],
            ],

            beforeSave: function ($teacher, $component) {
                if ($component->image) {
                    if (Storage::disk('public')->exists($component->image)) {
                        Storage::disk('public')->delete($component->image);
                    }

                    $teacher->image = $component->image->store(path: 'images', options: 'public');
                }
                if ($component->logo) {
                    if (Storage::disk('public')->exists($component->logo)) {
                        Storage::disk('public')->delete($component->logo);
                    }

                    $teacher->logo = $component->logo->store(path: 'images', options: 'public');
                }

                if (!$component->status) {
                    $teacher->notes = $component->notes;
                } else {
                    $teacher->notes = null;
                }
            },
        );

        $this->reset(['code_id', 'name', 'email', 'category', 'status', 'image', 'logo', 'description', 'position', 'order']);
        $this->unsetModel();
        $this->unsetRecordId();
        $this->drawer = false;
    }

    public function changeStatus(): void
    {
        try {
            DB::beginTransaction();

            foreach ($this->selected as $id) {
                $teacher = Teacher::find($id);
                $teacher->status = !$teacher->status;

                if (!$teacher->status) {
                    $teacher->notes = $this->notes;
                } else {
                    $teacher->notes = null;
                }
                $teacher->save();
            }

            DB::commit();
            $this->success('Status Berhasil Diubah.', position: 'toast-bottom');
            $this->reset('selected', 'modalAlertWarning', 'notes');
        } catch (\Exception $th) {
            DB::rollBack();
            $this->error('Status Gagal Diubah.', position: 'toast-bottom');
            Log::error($th);
        }
    }

    public function delete(): void
    {
        $this->setModel(new Teacher());
        foreach ($this->selected as $id) {
            $this->recordId = $id;
            $this->deleteData(
                beforeDelete: function ($id, $component) {
                    $teacher = Teacher::find($id);
                    if ($teacher->image) {
                        Storage::disk('public')->delete($teacher->image);
                    }
                    if ($teacher->logo) {
                        Storage::disk('public')->delete($teacher->logo);
                    }
                },
            );
            $this->reset('recordId');
        }

        $this->reset('selected');
        $this->reset($this->varTeacher);
        $this->unsetRecordId();
        $this->unsetModel();
        $this->modalAlertDelete = false;
        $this->drawer = false;
    }

    public function datas(): LengthAwarePaginator
    {
        return Teacher::query()
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%")
                    ->orWhere('code_id', 'like', "%{$this->search}%")
                    ->orWhere('email', 'like', "%{$this->search}%")
                    ->orWhere('category', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            // ['key' => 'code_id', 'label' => 'Teacher ID'],
            ['key' => 'order', 'label' => 'Order'],
            ['key' => 'name', 'label' => 'Name'],
            // ['key' => 'email', 'label' => 'Email'],
            ['key' => 'category', 'label' => 'Category'],
            ['key' => 'position', 'label' => 'Position'],
            ['key' => 'image', 'label' => 'Image'],
            ['key' => 'logo', 'label' => 'Maskot'],
            ['key' => 'status', 'label' => 'Status'],
            ['key' => 'notes', 'label' => 'Notes'],
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
            $wire.code_id = '';
            $wire.name = '';
            $wire.email = '';
            $wire.category = 'Management';
            $wire.status = true;
            $wire.description = '';
            $wire.position = '';
            $wire.notes = '';
            $wire.getLast();
            document.getElementById('previewImage').src = '/' + $wire.oldImage;
            document.getElementById('previewImage2').src = '/' + $wire.oldLogo;
            $wire.image = null;
            $wire.logo = null;
            $wire.drawer = true;
            $wire.$refresh();
        })

        $js('detail', (teacher) => {
            $wire.recordId = teacher.id;
            $wire.code_id = teacher.code_id;
            $wire.name = teacher.name;
            $wire.email = teacher.email;
            $wire.category = teacher.category;
            document.getElementById('previewImage').src = '/storage/' + teacher.image;
            document.getElementById('previewImage2').src = '/storage/' + teacher.logo;
            $wire.image = null;
            $wire.logo = null;
            $wire.status = teacher.status;
            $wire.description = teacher.description;
            $wire.position = teacher.position;
            $wire.order = teacher.order;
            $wire.notes = teacher.notes;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Teachers" separator>
        <x-slot:actions>
            @can('teacher-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
             with-pagination wire:model.live="selected"
             selectable :row-decoration="[
                'bg-error/20' => fn($data) => !$data->status,
             ]">
            @scope('cell_image', $data)
                <img src="{{ asset('storage/' . $data['image']) }}" alt="" style="width: 100px; height: auto">
            @endscope
            @scope('cell_logo', $data)
                <img src="{{ asset('storage/' . $data['logo']) }}" alt="" style="width: 100px; height: auto">
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            @scope('cell_notes', $data)
                {{ $data->notes ?? '-' }}
            @endscope
            @scope('actions', $data)
                <x-button icon="o-pencil" class="btn-sm" wire:click="$js.detail({{ $data }})" />
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        @if ($selected)
            <div class="flex justify-end items-center gap-2">
                @can('teacher-delete')
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
    @include('livewire.back-end.teacher-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    {{--  modal --}}
    <x-modal wire:model="modalAlertWarning" class="backdrop-blur">
        <x-form wire:submit="changeStatus" class="relative" no-separator>
            <div class="flex justify-center items-center">
                    <div class="mb-5 rounded-lg w-full text-center">
                    <x-icon name="c-shield-exclamation" class="w-16 h-16 text-yellow-700 mx-auto mb-4" />
                    <p class="text-center">Apakah anda yakin untuk Mengubah data ini?</p>
                </div>
            </div>
            <div>
                <x-textarea label="Notes" wire:model='notes' rows="3" hint="Please provide a reason for deactivating this teacher" />
            </div>
            <x-slot:actions>
                <x-button label="Tidak" @click="$wire.modalAlertWarning = false" />
                <x-button label="Ya" class="btn-primary" type="submit" spinner="changeStatus" />
            </x-slot:actions>
        </x-form>
    </x-modal>



    <!-- MODAL UPLOAD FILE -->
    {{-- @include('livewire.modals.modal-upload-file') --}}
</div>
