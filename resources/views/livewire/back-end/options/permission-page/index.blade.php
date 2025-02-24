<?php

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use function Livewire\Volt\{state, title, usesPagination, with, uses};
use Jantinnerezo\LivewireAlert\LivewireAlert;

uses([LivewireAlert::class]);
usesPagination(theme: 'bootstrap');

title('Permissions');

state([
    'id' => '',
    'name' => '',
    'perPage' => 10,
    'search' => '',
]);

with(
    fn() => [
        'permissions' => Permission::query()
            ->where('name', 'like', "%{$this->search}%")
            ->orderBy('created_at', 'desc')
            ->paginate($this->perPage),
    ],
);

$create = function () {
    $this->id = '';
    $this->name = '';
};

$edit = function ($id) {
    $permission = Permission::find($id);

    $this->id = $permission->id;
    $this->name = $permission->name;
};

$modalDelete = function ($id) {
    $this->id = $id;
};

$save = function () {
    $this->validate([
        'name' => $this->id ? 'required|unique:permissions,name,' . $this->id . ',id' : 'required|unique:permissions,name',
    ]);

    try {
        DB::beginTransaction();

        if ($this->id) {
            $permission = Permission::findOrFail($this->id);
            $permission->update([
                'name' => $this->name,
            ]);
        } else {
            $permission = Permission::create([
                'name' => $this->name,
            ]);
        }

        DB::commit();

        $this->alert('success', 'Permission berhasil disimpan');
        $this->reset(['id', 'name']);
        $this->dispatch('save');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Permission gagal disimpan');
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
        $permission = Permission::findOrFail($this->id);
        $permission->delete();
        DB::commit();

        $this->reset('id');
        $this->alert('success', 'Permission berhasil dihapus');

        $this->dispatch('delete');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Permission gagal dihapus');
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

<div>
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
                <h3 class="m-0 font-weight-bold text-primary"><i class="fas fa-fw fa-unlock-alt"></i> Permissions</h3>
                <div class="float-right">
                    <!-- Button trigger modal -->

                    <button type="button" class="btn btn-sm btn-primary" wire:click="create" data-toggle="modal"
                        data-target="#exampleModal">
                        Create
                    </button>
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
                                <th>Name</th>
                                <th>Created_at</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Created_at</th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <tbody>
                            @forelse ($permissions as $permission)
                                <tr>
                                    <td>{{ $permission->name }}</td>
                                    <td>{{ $permission->created_at->format('d/m/Y') }}</td>
                                    <td>
                                        <a href="#" class="btn btn-sm btn-primary"
                                            wire:click="edit({{ $permission->id }})" data-toggle="modal"
                                            data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                        <a href="#" class="btn btn-sm btn-danger"
                                            wire:click='modalDelete({{ $permission->id }})' data-toggle="modal"
                                            data-target="#modalDelete"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="text-center">No Permissions found</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                    {{ $permissions->links(data: ['scrollTo' => false]) }}
                </div>
            </div>
        </div>

        @include('livewire.back-end.options.permission-page.form')
        @include('livewire.back-end.modals.delete')
    </div>
