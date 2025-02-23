<?php

use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, usesPagination, with, uses};

title('Posts');
uses([LivewireAlert::class]);
usesPagination(theme: 'bootstrap');

state([
    'id' => '',
    'perPage' => 10,
    'search' => '',
]);

$modalDelete = function ($id) {
    $this->id = $id;
};

$delete = function () {
    try {
        DB::beginTransaction();
        $post = Post::find($this->id);
        $post->delete();
        DB::commit();
        $this->reset('id');
        $this->dispatch('delete');
        $this->alert('success', 'Post berhasil dihapus');
    } catch (\Exception $e) {
        DB::rollBack();
        $this->reset('id');
        $this->alert('error', 'An error occurred while deleting the post.');

        Log::channel('debug')->error('Error: ' . $e->getMessage(), [
            'exception' => $e,
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'trace' => $e->getTraceAsString(),
        ]);
    }
};

with(fn () => [
    'posts' => Post::query()
        ->with('category', 'user')
        ->where('title', 'like', "%{$this->search}%")
        ->orWhere('sub_title', 'like', "%{$this->search}%")
        ->orWhere('slug', 'like', "%{$this->search}%")
        ->whereHas('category', fn ($q) => $q->where('name', 'like', "%{$this->search}%"))
        ->whereHas('user', fn ($q) => $q->where('name', 'like', "%{$this->search}%"))
        ->orderBy('created_at', 'desc')
        ->paginate($this->perPage),
]);

?>

@script
    <script>
        Livewire.on('delete', () => {
            $('#modalDelete').modal('hide');
        });
    </script>
@endscript

<div>
    <div class="card shadow mb-4">
        <div class="card-header d-flex justify-content-between items-center py-3">
            <h3 class="m-0 font-weight-bold text-primary">Posts</h3>
            <div class="float-right">
                <!-- Button trigger modal -->
                @can('post-create')
                <a href="{{ route('post.form') }}" class="btn btn-sm btn-primary" >
                    Create
                </a>
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
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Category</th>
                            <th>Writer</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Category</th>
                            <th>Writer</th>
                            <th>Status</th>
                            <th>Created_at</th>
                            <th></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($posts as $post)
                            <tr>
                                <td>{{ $post->title }}</td>
                                <td>{{ $post->slug }}</td>
                                <td>{{ $post->category->name }}</td>
                                <td>{{ $post->user->name }}</td>
                                <td>{{ $post->status ? 'Active' : 'Inactive' }}</td>
                                <td>{{ $post->created_at->format('d/m/Y') }}</td>
                                <td>
                                    @can('post-edit')
                                    <a href="{{ route('post.form', ['slug' => $post->slug]) }}" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
                                    @endcan
                                    @can('post-delete')
                                    <a href="#" class="btn btn-sm btn-danger" wire:click='modalDelete({{ $post->id }})' data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash"></i></a>
                                    @endcan
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="text-center">No Posts found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
                {{ $posts->links(data: ['scrollTo' => false]) }}
            </div>
        </div>
    </div>

    {{-- @include('livewire.back-end.post-page.form') --}}
    @include('livewire.back-end.modals.delete')
</div>
