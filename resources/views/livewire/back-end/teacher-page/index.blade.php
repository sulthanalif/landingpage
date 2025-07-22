<?php

use App\ManageDatas;
use App\Models\Reason;
use Mary\Traits\Toast;
use App\Models\Teacher;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;
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
    public bool $drawerReason = false;
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
    public int $order = 0;
    public bool $status = true;
    public ?\Illuminate\Http\UploadedFile $image = null;
    public ?\Illuminate\Http\UploadedFile $logo = null;
    public array $varTeacher = ['recordId', 'reason_id', 'code_id', 'name', 'email', 'category', 'status', 'image', 'logo', 'description'];
    public string $oldImage = 'img/upload.png';
    public string $oldLogo = 'img/upload.png';

    public Collection $colorsSearchable;

    public string $reason = '';
    public ?string $color = null;

    public ?int $reason_id = null;
    public Collection $reasons;

    public function mount()
    {
        $this->getLast();
        $this->searchColor();
        $this->reasons = collect(Reason::all());
    }

    public function searchColor(string $value = '')
    {
        $colors = collect([
            ['id' => 'bg-red-500', 'name' => 'Red', 'code' => '#ef4444'],
            ['id' => 'bg-green-500', 'name' => 'Green', 'code' => '#22c55e'],
            ['id' => 'bg-blue-500', 'name' => 'Blue', 'code' => '#3b82f6'],
            ['id' => 'bg-amber-500', 'name' => 'Amber', 'code' => '#f59e0b'],
            ['id' => 'bg-cyan-500', 'name' => 'Cyan', 'code' => '#06b6d4'],
            ['id' => 'bg-lime-500', 'name' => 'Lime', 'code' => '#84cc16'],
            ['id' => 'bg-indigo-500', 'name' => 'Indigo', 'code' => '#6366f1'],
            ['id' => 'bg-pink-500', 'name' => 'Pink', 'code' => '#ec4899'],
            ['id' => 'bg-teal-500', 'name' => 'Teal', 'code' => '#14b8a6'],
            ['id' => 'bg-rose-500', 'name' => 'Rose', 'code' => '#f43f5e'],
            ['id' => 'bg-gray-500', 'name' => 'Gray', 'code' => '#9ca3af'],
            ['id' => 'bg-zinc-500', 'name' => 'Zinc', 'code' => '#71717a'],
            ['id' => 'bg-neutral-500', 'name' => 'Neutral', 'code' => '#737373'],
            ['id' => 'bg-stone-500', 'name' => 'Stone', 'code' => '#78716c'],
        ]);

        $selectedOption = $colors->firstWhere('id', $this->color);

        $filtered = $colors->filter(function ($item) use ($value) {
            return str_contains(strtolower($item['name']), strtolower($value));
        })->values();

        $this->colorsSearchable = $filtered->when($selectedOption, fn ($col) => $col->push($selectedOption))->unique('id');

    }

    public function searchReason(string $value = '')
    {
        $selectedOptions = Reason::where('id', $this->reason_id)->get();

        $this->reasons = Reason::query()
            ->where('reason', 'like', '%'.$value.'%')
            ->get()
            ->merge($selectedOptions);
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
                    $this->deleteImage($component->image);
                    $teacher->image = $this->uploadImage($component->image, 'teachers');
                }
                if ($component->logo) {
                    $this->deleteImage($component->logo);
                    $teacher->logo = $this->uploadImage($component->logo, 'teachers');
                }

                if (!$component->status) {
                    $teacher->reason_id = $component->reason_id;
                } else {
                    $teacher->reason_id = null;
                }
            },
        );

        $this->reset(['code_id', 'reason_id', 'name', 'email', 'category', 'status', 'image', 'logo', 'description', 'position', 'order']);
        $this->unsetModel();
        $this->unsetRecordId();
        $this->drawer = false;
    }

    public function saveReason(): void
    {
        $this->validate([
            'reason' => ['required', 'string'],
            'color' => ['required'],
        ]);

        try {
            DB::beginTransaction();

            Reason::create([
                'reason' => $this->reason,
                'css' => $this->color,
                'code' => $this->colorsSearchable->firstWhere('id', $this->color)['code'],
            ]);

            DB::commit();

            $this->success('Reason created successfully', position: 'toast-bottom');
            $this->reset('reason', 'color');
            $this->reasons = collect(Reason::all());
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error('Error creating reason', position: 'toast-bottom');
            Log::channel('debug')->error($e->getMessage());
        }
    }

    public function deleteReason($id): void
    {
        try {
            DB::beginTransaction();

            Reason::query()->where('id', $id)->delete();

            DB::commit();

            $this->success('Reason deleted successfully', position: 'toast-bottom');
            $this->reasons = Reason::all();
        } catch (\Exception $th) {
            DB::rollBack();
            $this->error('Error deleting Reason', position: 'toast-bottom');
            Log::channel('debug')->error($th->getMessage());
        }
    }

    public function changeStatus(): void
    {
        try {
            DB::beginTransaction();

            foreach ($this->selected as $id) {
                $teacher = Teacher::find($id);
                $teacher->status = !$teacher->status;

                if (!$teacher->status) {
                    $teacher->reason_id = $this->reason_id;
                } else {
                    $teacher->reason_id = null;
                }
                $teacher->save();
            }

            DB::commit();
            $this->success('Status Berhasil Diubah.', position: 'toast-bottom');
            $this->reset('selected', 'modalAlertWarning', 'reason_id');
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
                        $this->deleteImage($teacher->image);
                    }
                    if ($teacher->logo) {
                        $this->deleteImage($teacher->logo);
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
            ->withAggregate('reason', 'reason')
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%")
                    ->orWhere('code_id', 'like', "%{$this->search}%")
                    ->orWhere('email', 'like', "%{$this->search}%")
                    ->orWhere('category', 'like', "%{$this->search}%")
                    ->orWhere('position', 'like', "%{$this->search}%");
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
            ['key' => 'reason_reason', 'label' => 'Reason'],
        ];
    }

    public function rowDecoration(): array
    {
        return Reason::get()->map(function ($reason) {
            return [
                $reason->css => function ($data) use ($reason) {
                    return $data->reason_id == $reason->id && !$data->status;
                }
            ];
        })->collapse()->toArray();
    }

    public function with(): array
    {
        return [
            'datas' => $this->datas(),
            'headers' => $this->headers(),
            'rowDecoration' => $this->rowDecoration(),
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
            $wire.reason_id = null;
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
            $wire.reason_id = teacher.reason_id;
            $wire.drawer = true;
            $wire.$refresh();
        })

        $js('reason', () => {
            $wire.drawerReason = true;
            $wire.reason = '';
            $wire.color = null;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Teachers" separator>
        <x-slot:actions>
            @can('teacher-create')
                <x-button label="Reason Management" @click="$js.reason" responsive icon="o-cog" />
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
             selectable :row-decoration="$rowDecoration" no-hover>
            @scope('cell_image', $data)
                <img src="{{ asset('storage/' . $data['image']) }}" alt="" width="100" height="auto" loading="lazy">
            @endscope
            @scope('cell_logo', $data)
                <img src="{{ asset('storage/' . $data['logo']) }}" alt="" width="100" height="auto" loading="lazy">
            @endscope
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-white">Tidak aktif</span>
                @endif
            @endscope
            @scope('cell_reason_reason', $data)
                {{ $data->reason?->reason ?? '-' }}
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
                <x-choices
                label="Reason"
                wire:model="reason_id"
                :options="$reasons"
                search-function="searchReason"
                placeholder="Search ..."
                hint="Please provide a reason for deactivating this teacher"
                single
                clearable
                searchable >
                    @scope('item', $reason)
                        <x-list-item :item="$reason" value='reason'>
                            <x-slot:actions>
                                <div class="w-8 h-8 rounded-full border-4 {{ $reason['css'] }}"></div>
                            </x-slot:actions>
                        </x-list-item>
                    @endscope

                    {{-- Selection slot--}}
                    @scope('selection', $reason)
                        <div class="w-full px-2 py-1 rounded border-4 {{ $reason['css'] }}">{{ $reason['reason'] }}</div>
                    @endscope
                </x-choices>
            </div>
            <x-slot:actions>
                <x-button label="Tidak" @click="$wire.modalAlertWarning = false" />
                <x-button label="Ya" class="btn-primary" type="submit" spinner="changeStatus" />
            </x-slot:actions>
        </x-form>
    </x-modal>



    @include('livewire.back-end.teacher-page.create-color')
    <!-- MODAL UPLOAD FILE -->
    {{-- @include('livewire.modals.modal-upload-file') --}}
</div>
