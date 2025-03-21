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
    public ?UploadedFile $file = null;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    //varActivity
    public string $oldImage = '';
    public string $title = '';
    public string $date = '';
    public ?UploadedFile $image = null;
    public bool $status = true;

    public array $varActivity = ['recordId', 'title', 'date', 'image', 'status', 'oldImage'];

    //select status
    public array $selectStatus = [['id' => true, 'name' => 'Aktif'], ['id' => false, 'name' => 'Tidak aktif']];

    public function create(): void
    {
        $this->reset($this->varActivity);
        $this->oldImage = 'img/upload.png';
        // $this->refresh();
        $this->dispatch('updatedImage', asset($this->oldImage));
        $this->drawer = true;
    }

    public function detail($id): void
    {
        $this->reset($this->varActivity);
        $activity = Activity::find($id);
        $this->oldImage = $activity->image ? 'storage/' . $activity->image : 'img/upload.png';
        $this->recordId = $activity->id;
        $this->title = $activity->title;
        $this->date = $activity->date;
        // $this->image = $activity->image;
        $this->status = $activity->status;
        // $this->refresh();
        $this->dispatch('updatedImage', asset($this->oldImage));
        $this->drawer = true;
    }

    public function save(): void
    {
        $this->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'image' => $this->recordId ? 'nullable' : 'required' . '|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required',
        ]);

        try {
            DB::beginTransaction();
            if ($this->recordId) {
                $activity = Activity::find($this->recordId);
                $activity->update([
                    'title' => $this->title,
                    'date' => $this->date,
                    'status' => $this->status,
                ]);

                if ($this->image) {
                    if (Storage::disk('public')->exists($activity->image)) {
                        Storage::disk('public')->delete($activity->image);
                    }

                    $activity->update(['image' => $this->image->store(path: 'images', options: 'public')]);
                }
            } else {
                Activity::create([
                    'title' => $this->title,
                    'date' => $this->date,
                    'image' => $this->image->store(path: 'images', options: 'public'),
                    'status' => $this->status,
                ]);
            }
            DB::commit();
            $this->success('Activity berhasil disimpan', position: 'toast-bottom');
            $this->reset($this->varActivity);
            $this->drawer = false;
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->error('Activity gagal disimpan', position: 'toast-bottom');
            Log::channel('debug')->error('Error: ' . $th->getMessage(), [
                'exception' => $th,
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'code' => $th->getCode(),
                'trace' => $th->getTraceAsString(),
            ]);
        }
    }

    public function changeStatus(): void
    {
        foreach ($this->selected as $id) {
            $sub = Activity::find($id);
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
        Activity::whereIn('id', $this->selected)->delete();
        $this->selected = [];
        $this->modalAlertDelete = false;
        $this->success('Data berhasil dihapus', position: 'toast-bottom');
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
        return [['key' => 'image', 'label' => 'Image'],['key' => 'title', 'label' => 'Title'], ['key' => 'date', 'label' => 'Date'], ['key' => 'status', 'label' => 'Status'], ['key' => 'created_at', 'label' => 'Created At']];
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
            $wire.create();
            const previewImage = document.getElementById('previewImage');
            const oldImage = @json(asset($oldImage)); // Convert ke string agar bisa diakses

            $wire.on('updatedImage', image => {
                if (image) {
                    previewImage.src =
                        image; // Pastikan `image` yang dikirim adalah URL, bukan file
                } else {
                    previewImage.src = oldImage; // Kembalikan ke default jika tidak ada gambar
                }
            });
        });

        $js('detail', (id) => {
            $wire.detail(id);
            const previewImage = document.getElementById('previewImage');
            const oldImage = @json(asset($oldImage)); // Convert ke string agar bisa diakses

            $wire.on('updatedImage', image => {
                if (image) {
                    previewImage.src =
                        image; // Pastikan `image` yang dikirim adalah URL, bukan file
                } else {
                    previewImage.src = oldImage; // Kembalikan ke default jika tidak ada gambar
                }
            })
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
            wire:model.live="selected" selectable with-pagination>
            @scope('cell_image', $data)
                <img src="{{ asset('storage/' . $data['image']) }}" alt="" style="width: 100px; height: auto">
            @endscope
            @scope('cell_title', $data)
                <p class="cursor-pointer text-blue-500 hover:underline" @click="$js.detail({{ $data['id'] }})">
                    {{ $data['title'] }}</p>
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
    @include('livewire.back-end.activity-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file')
</div>
