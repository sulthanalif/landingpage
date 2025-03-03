<?php

use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, uses, mount, with};

title(isset($id) ? 'Edit Post' : 'Create Post');

uses([LivewireAlert::class]);

state([
    'id' => '',
    'title' => '',
    'sub_title' => '',
    'body' => '',
    'category_id' => '',
    'status' => '',
]);

state(['slug'])->url();

with([
    'categories' => Category::all(),
]);

mount(function () {
    if ($this->slug) {
        $post = Post::where('slug', $this->slug)->first();
        $this->id = $post->id;
        $this->title = $post->title;
        $this->sub_title = $post->sub_title;
        $this->description = $post->description;
        $this->slug = $post->slug;
        $this->body = $post->body;
        $this->category_id = $post->category_id;
        $this->status = $post->status;
    }
});

$generateSlug = function () {
    $slug = Str::slug($this->title);
    $this->slug = $slug;
};

$save = function () {
    $this->validate([
        'slug' => $this->id ? 'required|unique:posts,slug,' . $this->id . ',id' : 'required|unique:posts,slug',
        'title' => 'required',
        'sub_title' => 'nullable',
        'body' => 'required',
        'category_id' => 'required',
        'status' => 'required',
    ]);

    try {
        DB::beginTransaction();

        if ($this->id) {
            $post = Post::find($this->id);
            $post->update([
                'slug' => $this->slug,
                'title' => $this->title,
                'sub_title' => $this->sub_title,
                'body' => $this->body,
                'category_id' => $this->category_id,
                'status' => $this->status,
            ]);
        } else {
            $post = Post::create([
                'slug' => $this->slug,
                'title' => $this->title,
                'sub_title' => $this->sub_title,
                'body' => $this->body,
                'category_id' => $this->category_id,
                'status' => $this->status,
                'user_id' => auth()->user()->id,
            ]);
        }

        DB::commit();
        $this->reset();
        $this->flash('success', 'Post saved successfully', [], route('post'));
    } catch (\Exception $e) {
        DB::rollBack();
        $this->alert('error', 'An error occurred while saving the post.');

        Log::channel('debug')->error('Error: ' . $e->getMessage(), [
            'exception' => $e,
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'trace' => $e->getTraceAsString(),
        ]);
    }
};

?>


<div>
    <div class="card shadow mb-4">
        <div class="card-header d-flex justify-content-between items-center py-3">
            <h3 class="m-0 font-weight-bold text-primary">{{ $id ? 'Edit' : 'Create' }} Post</h3>
            <div class="float-right">
                <a href="{{ route('post') }}" class="btn btn-sm btn-secondary">
                    Back
                </a>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="slug" class="col-form-label">Slug<span class="text-danger">*</span> </label>
                        <input type="text" class="form-control @error('slug') is-invalid @enderror"
                            wire:model.live='slug' readonly>
                        @error('slug')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="title" class="col-form-label">Title<span class="text-danger">*</span> </label>
                        <input type="text" wire:change='generateSlug'
                            class="form-control @error('title') is-invalid @enderror" wire:model.live='title'>
                        @error('title')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="sub_title" class="col-form-label">Sub Title </label>
                        <input type="text" class="form-control @error('sub_title') is-invalid @enderror"
                            wire:model='sub_title'>
                        @error('sub_title')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="body" class="col-form-label">Body </label>
                        <textarea id="editor" name="content"></textarea>
                        @error('body')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="category_id" class="col-form-label">Category <span
                                class="text-danger">*</span></label>
                        <select class="form-control @error('category_id') is-invalid @enderror"
                            wire:model='category_id'>
                            <option value="" disabled selected>Select...</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        </select>
                        @error('category_id')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label for="status" class="col-form-label">Status <span class="text-danger">*</span></label>
                        <select class="form-control @error('status') is-invalid @enderror" wire:model='status'>
                            <option value="" disabled selected>Select...</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        @error('status')
                            <span class="text-danger text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" wire:click='save'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script src="https://cdn.ckeditor.com/4.19.1/full/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('editor', {
            filebrowserUploadUrl: "{{ route('upload.image') }}",
            filebrowserUploadMethod: 'form',
            extraPlugins: 'uploadimage',
            uploadUrl: "{{ route('upload.image') }}",
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });
    </script>
@endpush
