<?php

use App\Models\Activity;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, usesPagination, with, uses};

title('Activity');

usesPagination(theme: 'bootstrap');

uses([LivewireAlert::class, WithFileUploads::class]);

state([
    'id' => '',
    'title' => '',
    'date' => '',
    'image' => '',
    'old_image' => '',
    'status' => '',
    'search' => '',
    'perPage' => 10,
]);

with(
    fn() => [
        'activities' => Activity::query()
            ->where('title', 'like', "%{$this->search}%")
            ->orderBy('created_at', 'desc')
            ->paginate($this->perPage),
]);

$create = function () {
    $this->id = '';
    $this->title = '';
    $this->date = now()->format('Y-m-d');
    $this->image = '';
    $this->old_image = '';
    $this->status = '';
};

$edit = function ($id) {
    $activity = Activity::findOrFail($id);
    $this->id = $activity->id;
    $this->title = $activity->title;
    $this->date = $activity->date;
    $this->old_image = $activity->image;
    $this->status = $activity->status;
};

$modalDelete = function ($id) {
    $this->id = $id;
};

$save = function () {
    $this->validate([
        'title' => 'required|string|max:255',
        'date' => 'required|date',
        'image' => $this->id ? 'nullable' : 'required' .'|image|mimes:jpeg,png,jpg|max:2048',
        'status' => 'required',
    ]);

    try {
        DB::beginTransaction();
        if ($this->id) {
            $activity = Activity::find($this->id);
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
        $this->alert('success', 'Activity berhasil disimpan');
        $this->reset(['id', 'title', 'date', 'image', 'status', 'old_image']);
        $this->dispatch('save');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Activity gagal disimpan');
        Log::channel('debug')->error('Error: ' . $th->getMessage(), [
            'exception' => $th,
            'file' => $th->getFile(),
            'line' => $th->getLine(),
            'code' => $th->getCode(),
            'trace' => $th->getTraceAsString(),
        ]);
    }
};

$delete = function () {

    try {
        DB::beginTransaction();
        $activity = Activity::find($this->id);
        if (!$activity) {
            $this->alert('error', 'Data tidak ditemukan');
            return;
        }

        if (Storage::disk('public')->exists($activity->image)) {
            Storage::disk('public')->delete($activity->image);
        }

        $activity->delete();
        DB::commit();
        $this->alert('success', 'Activity berhasil dihapus');
        $this->reset('id');
        $this->dispatch('delete');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Activity gagal dihapus');
        Log::channel('debug')->error('Error: ' . $th->getMessage(), [
            'exception' => $th,
            'file' => $th->getFile(),
            'line' => $th->getLine(),
            'code' => $th->getCode(),
            'trace' => $th->getTraceAsString(),
        ]);
    }
};

?>

@script
    <script>
        Livewire.on('save', () => {
            $('#exampleModal').modal('hide');
        });

        Livewire.on('delete', () => {
            $('#modalDelete').modal('hide');
        });
    </script>
@endscript

<div>
    <div class="card shadow mb-4">
        <div class="card-header d-flex justify-content-between items-center py-3">
            <h3 class="m-0 font-weight-bold text-primary"><i class="fas fa-fw fa-camera"></i> Activities</h3>
            <div class="float-right">
                <!-- Button trigger modal -->
                @can('activity-create')
                    <button type="button" class="btn btn-sm btn-primary" wire:click="create" data-toggle="modal"
                        data-target="#exampleModal" data-bs-backdrop="false">
                        Create
                    </button>
                @endcan
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <div class="d-flex justify-content-between items-center my-3">
                    <div>
                        <select class="form-control form-select" wire:model.live='perPage'
                            aria-label="Default select example">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="mr-2">
                        <form class="navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small"
                                    wire:model.live='search' placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2">
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($activities as $activity)
                            <tr>
                                <td>{{ $activity->date }}</td>
                                <td>{{ $activity->title }}</td>
                                <td>{{ $activity->image }}</td>
                                <td>{{ $activity->status ? 'Active' : 'Inactive' }}</td>
                                <td>{{ $activity->created_at->format('d/m/Y') }}</td>
                                <td>
                                    @can('activity-edit')
                                        <a href="#" class="btn btn-sm btn-primary"
                                            wire:click="edit({{ $activity->id }})" data-toggle="modal"
                                            data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                    @endcan
                                    @can('activity-delete')
                                        <a href="#" class="btn btn-sm btn-danger"
                                            wire:click='modalDelete({{ $activity->id }})' data-toggle="modal"
                                            data-target="#modalDelete"><i class="fas fa-trash"></i></a>
                                    @endcan
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="text-center">No activity found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
                {{ $activities->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>

    @include('livewire.back-end.activity-page.form')
    @include('livewire.back-end.modals.delete')
</div>
