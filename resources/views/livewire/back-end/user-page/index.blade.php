<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use function Livewire\Volt\{state, title, usesPagination, with};

usesPagination(theme: 'bootstrap');

title('Users');

state([
    'id' => '',
    'name' => '',
    'email' => '',
    'password' => '',
    'status' => '',
    'role' => '',
    'perPage' => 10,
    'search' => '',
]);

with(fn () => [
    'users' => User::query()
        ->where('name', 'like', '%' . $this->search . '%')
        ->orWhere('email', 'like', '%' . $this->search . '%')
        ->orderBy('created_at', 'desc')
        ->paginate($this->perPage)
]);

$create = function () {
    $this->reset(['id','name', 'email', 'password', 'status', 'role']);
};

$edit = function ($id) {
    $user = User::find($id);
    $this->id = $user->id;
    $this->name = $user->name;
    $this->email = $user->email;
    $this->status = $user->status;
    $this->role = $user->roles[0]->name;
};

$modalDelete = function ($id) {
    $this->id = $id;
};

$save = function () {
    $this->validate([
        'name' => 'required',
        'email' => $this->id ? "required|email|unique:users,email,{$this->id}" : 'required|email|unique:users,email',
        'password' => $this->id ? 'nullable' : 'required',
        'status' => 'required',
        'role' => 'required',
    ]);

    try {
        DB::beginTransaction();
        if ($this->id) {
            $user = User::find($this->id);
            $user->update([
                'name' => $this->name,
                'email' => $this->email,
                'status' => $this->status,
            ]);
            $user->syncRoles([$this->role]);
        } else {
            $user = User::create([
                'name' => $this->name,
                'email' => $this->email,
                'password' => Hash::make($this->password),
                'status' => $this->status,
            ]);
            $user->assignRole($this->role);
        }
        DB::commit();
        $this->reset(['id', 'name', 'email', 'password', 'status', 'role']);

        $this->dispatch('save');
    } catch (\Exception $e) {
        session()->flash('error', 'An error occurred while saving the user.');
        Log::channel('debug')->error('Error: ' . $e->getMessage(), [
            'exception' => $e,
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'trace' => $e->getTraceAsString(),
        ]);
    }
};

$delete = function ($id) {
    try {
        DB::beginTransaction();
        $user = User::find($id);
        $user->delete();
        DB::commit();
        $this->reset('id');
        $this->dispatch('delete');
    } catch (\Exception $e) {
        $this->reset('id');
        session()->flash('error', 'An error occurred while deleting the user.');
        Log::channel('debug')->error('Error: ' . $e->getMessage(), [
            'exception' => $e,
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'trace' => $e->getTraceAsString(),
        ]);
    }
}


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
            <h3 class="m-0 font-weight-bold text-primary">Users</h3>
            <div class="float-right">
                <!-- Button trigger modal -->
                @can('user-create')
                <button type="button" class="btn btn-sm btn-primary" wire:click="create" data-toggle="modal" data-target="#exampleModal">
                    Create
                </button>
                @endcan
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <div class="d-flex justify-content-between items-center my-3">
                    <div>
                        <select class="form-control form-select" wire:model.live='perPage' aria-label="Default select example">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                    </div>
                    <div class="mr-2">
                        <form
                        class="navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" wire:model.live='search' placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2">
                        </div>
                    </form>
                    </div>
                </div>
                <table class="table table-bordered"  width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($users as $user)
                            <tr>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->email }}</td>
                                <td>{{ $user->status ? 'Active' : 'Inactive' }}</td>
                                <td>{{ $user->created_at->format('d/m/Y') }}</td>
                                <td>
                                    @can('user-edit')
                                    <a href="#" class="btn btn-sm btn-primary" wire:click="edit({{ $user->id }})" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                    @endcan
                                    @can('user-delete')
                                    <a href="#" class="btn btn-sm btn-danger" wire:click='modalDelete({{ $user->id }})' data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash"></i></a>
                                    @endcan
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="text-center">No users found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
                {{ $users->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>

    @include('livewire.back-end.user-page.form')
    @include('livewire.back-end.modals.delete')

</div>

