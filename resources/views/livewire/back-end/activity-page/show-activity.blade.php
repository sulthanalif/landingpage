<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Activity;
use App\Models\SubActivity;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Sub Activities')] class extends Component {
    use Toast, WithPagination, ManageDatas;

    public string $search = '';
    public Activity $activity;

    public bool $modalAlertWarning = false;
    public bool $modalAlertDelete = false;


    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'date', 'direction' => 'desc'];
    public int $perPage = 5;

    public function mount(Activity $activity): void
    {
        $this->activity = $activity;
    }

    public function back(): void
    {
        $this->redirect(route('activity'), navigate: true);
    }

    public function create(): void
    {
        $this->redirect(route('activity.form-sub', $this->activity), navigate: true);
    }

    public function edit(SubActivity $subActivity): void
    {
        $this->redirect(route('activity.form-sub', [
            'activity' => $this->activity,
            'subId' => $subActivity
        ]), navigate: true);
    }

    public function changeStatus(): void
    {
        try {
            DB::beginTransaction();

            foreach ($this->selected as $id) {
                $model = SubActivity::find($id);
                $model->status = !$model->status;
                $model->save();
            }

            DB::commit();
            $this->success('Status Berhasil Diubah.', position: 'toast-bottom');
            $this->reset('selected', 'modalAlertWarning');
        } catch (\Exception $th) {
            DB::rollBack();
            $this->error('Status Gagal Diubah.', position: 'toast-bottom');
            Log::error($th);
        }
    }

    public function delete(): void
    {
        $this->setModel(new SubActivity());
        foreach ($this->selected as $id) {
            $this->recordId = $id;
            $this->deleteData(
                beforeDelete: function ($id, $component) {
                    $model = SubActivity::find($id);
                    if ($model->image) {
                        Storage::disk('public')->delete($model->image);
                    }
                    foreach ($model->library as $library) {
                        if ($library['path']) {
                            Storage::disk('public')->delete($library['path']);
                        }
                    }
                },
            );
            $this->reset('recordId');
        }

        $this->reset('selected');
        $this->unsetRecordId();
        $this->unsetModel();
        $this->modalAlertDelete = false;
        $this->drawer = false;
    }


    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function datas(): LengthAwarePaginator
    {
        return $this->activity->subActivities()
            ->where(function ($query) {
                $query->where('title', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'date', 'label' => 'Date'],
            ['key' => 'title', 'label' => 'Title'],
            ['key' => 'description', 'label' => 'Description'],
            ['key' => 'image', 'label' => 'Image'],
            ['key' => 'status', 'label' => 'Status'],
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

<div>
    <!-- HEADER -->
    <x-header title="Activity" subtitle="{{ $activity->label }}" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
            <x-button label="Create" @click="$wire.create" responsive icon="o-plus" spinner="create" />
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination wire:model.live="selected"
            selectable>
            @scope('cell_date', $data)
                <p>{{ \Carbon\Carbon::parse($data->date)->locale('id_ID')->isoFormat('D MMMM Y') }}</p>
            @endscope
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
            @scope('actions', $data)
                <div class="flex gap-2">
                    <x-button icon="o-pencil" class="btn-sm" wire:click="edit({{ $data->id }})" />
                    {{-- <x-button icon="o-eye" class="btn-sm" wire:click="show({{ $data->id }})"  spinner="show({{ $data->id }})"/> --}}
                </div>
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        @if ($selected)
            <div class="flex justify-end items-center gap-2">
                <div class="mt-3 flex justify-end">
                    <x-button label="Hapus" icon="o-trash" wire:click="modalAlertDelete = true" spinner
                        class="text-red-500" wire:loading.attr="disabled" />
                </div>

                <div class="mt-3 flex justify-end">
                    <x-button label="Change Status" icon="o-arrow-path-rounded-square"
                        wire:click="modalAlertWarning = true" spinner class="text-blue-500"
                        wire:loading.attr="disabled" />
                </div>
            </div>
        @endif
    </x-card>

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')
</div>
