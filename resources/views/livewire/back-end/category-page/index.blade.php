<?php

use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, usesPagination, with, uses};

title('Categories');
uses([LivewireAlert::class]);
usesPagination(theme: 'bootstrap');

state([
    'id' => '',
    'name' => '',
    'description' => '',
    'status' => '',
    'perPage' => 10,
    'search' => '',
]);

with(fn () => [
    'categories' => Category::query()
        ->where('name', 'like', "%{$this->search}%")
        ->orderBy('created_at', 'desc')
        ->paginate($this->perPage),
]);

$create = function () {
    $this->id = '';
    $this->name = '';
    $this->description = '';
    $this->status = '';
};

$edit = function ($id) {
    $category = Category::findOrFail($id);
    $this->id = $category->id;
    $this->name = $category->name;
    $this->status = $category->status;
    $this->description = $category->description;
};

$modalDelete = function ($id) {
    $this->id = $id;
};

$save = function () {
    $this->validate([
        'name' => $this->id ? 'required|unique:categories,name,' . $this->id . ',id' : 'required|unique:categories,name',
        'description' => 'required',
        'status' => 'required',
    ]);

    try {
        DB::beginTransaction();
        if ($this->id) {
            $category = Category::findOrFail($this->id);
            $category->update([
                'name' => $this->name,
                'description' => $this->description,
            ]);
        } else {
            Category::create([
                'name' => $this->name,
                'description' => $this->description,
            ]);
        }
        DB::commit();
        $this->alert('success', 'Category berhasil disimpan');
        $this->reset(['id', 'name', 'description']);
        $this->dispatch('save');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Category gagal disimpan');
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
        $category = Category::findOrFail($this->id);
        $category->delete();
        DB::commit();
        $this->reset('id');
        $this->alert('success', 'Category berhasil dihapus');
        $this->dispatch('delete');
    } catch (\Throwable $th) {
        DB::rollBack();
        $this->alert('error', 'Category gagal dihapus');
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
            <h3 class="m-0 font-weight-bold text-primary">Categories</h3>
            <div class="float-right">
                <!-- Button trigger modal -->
                @can('category-create')
                <button type="button" class="btn btn-sm btn-primary" wire:click="create" data-toggle="modal" data-target="#exampleModal" data-bs-backdrop="false">
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
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($categories as $category)
                            <tr>
                                <td>{{ $category->name }}</td>
                                <td>{{ $category->description }}</td>
                                <td>{{ $category->status ? 'Active' : 'Inactive' }}</td>
                                <td>{{ $category->created_at->format('d/m/Y') }}</td>
                                <td>
                                    @can('category-edit')
                                    <a href="#" class="btn btn-sm btn-primary" wire:click="edit({{ $category->id }})" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                    @endcan
                                    @can('category-delete')
                                    <a href="#" class="btn btn-sm btn-danger" wire:click='modalDelete({{ $category->id }})' data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash"></i></a>
                                    @endcan
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="text-center">No category found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
                {{ $categories->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>

    @include('livewire.back-end.category-page.form')
    @include('livewire.back-end.modals.delete')
</div>
