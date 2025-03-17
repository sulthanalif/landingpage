<?php

use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Jantinnerezo\LivewireAlert\LivewireAlert;
use function Livewire\Volt\{state, title, uses, mount, with, on};

title(isset($id) ? 'Edit Post' : 'Create Post');

uses([LivewireAlert::class]);

state([
    'id' => '',
    'title' => '',
    'sub_title' => '',
    'body' => '',
    'category_id' => '',
    'status' => '',
    'slug' => '',
]);

state(['slug_url'])->url();

with([
    'categories' => fn() => Category::all(),
]);

mount(function () {
    if ($this->slug_url) {
        $post = Post::where('slug', $this->slug_url)->first();
        if ($post) {
            $this->id = $post->id;
            $this->title = $post->title;
            $this->sub_title = $post->sub_title;
            $this->slug = $post->slug;
            $this->body = $post->body;
            $this->category_id = $post->category_id;
            $this->status = $post->status;

            $this->dispatch('updateBody', ...(is_array($content) ? $content : [$content]));

        }
    }
});

$generateSlug = function () {
    $this->slug = Str::slug($this->title);
};

on([
    'updateBody' => function ($data) {
        $this->body = $data['content'];
    },
]);

$save = function () {
    $this->validate([
        'slug' => $this->id ? 'required|unique:posts,slug,' . $this->id . ',id' : 'required|unique:posts,slug',
        'title' => 'required',
        'sub_title' => 'nullable',
        'body' => 'required',
        'category_id' => 'required',
        'status' => 'required',
    ]);

    $this->generateSlug();
    try {
        DB::beginTransaction();
        $data = [
            'slug' => $this->slug,
            'title' => $this->title,
            'sub_title' => $this->sub_title,
            'body' => $this->body,
            'category_id' => $this->category_id,
            'status' => $this->status,
        ];

        if ($this->id) {
            Post::find($this->id)->update($data);
        } else {
            $data['user_id'] = auth()->user()->id;
            Post::create($data);
        }

        DB::commit();
        $this->reset();
        $this->flash('success', 'Post saved successfully', [], route('post'));
    } catch (\Exception $e) {
        DB::rollBack();
        $this->alert('error', 'An error occurred while saving the post.');
    }
};
?>

<div x-data="tinymceComponent()" x-init="initEditor()">
    <div class="card shadow mb-4">
        <div class="card-header d-flex justify-content-between items-center py-3">
            <h3 class="m-0 font-weight-bold text-primary">{{ $id ? 'Edit' : 'Create' }} Post</h3>
            <a href="{{ route('post') }}" class="btn btn-sm btn-secondary">Back</a>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Title<span class="text-danger">*</span></label>
                <input type="text" class="form-control" wire:model.live='title'
                    x-on:change="$dispatch('updateSlug')">
            </div>
            <div class="form-group">
                <label>Sub Title</label>
                <input type="text" class="form-control" wire:model='sub_title'>
            </div>
            <div class="form-group" wire:ignore>
                <label>Body</label>
                <div wire:ignore>
                    <textarea id="tiny-editor" x-ref="editor" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label>Category<span class="text-danger">*</span></label>
                <select class="form-control" wire:model='category_id'>
                    <option value="" disabled selected>Select...</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label>Status<span class="text-danger">*</span></label>
                <select class="form-control" wire:model='status'>
                    <option value="" disabled selected>Select...</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" wire:click='save'>Save</button>
            </div>
        </div>
    </div>
</div>

@push('styles')
    <script src="https://cdn.tiny.cloud/1/08d4t4shdvti5w4vrql0voaztnvps1jtngr9iy40lozsy4jz/tinymce/7/tinymce.min.js"
        referrerpolicy="origin"></script>
@endpush

@push('scripts')
    <script>
        window.tinymceComponent = function() {
            return {
                initEditor() {
                    tinymce.init({
                        selector: '#tiny-editor',
                        plugins: 'image code',
                        toolbar: 'undo redo | link image | code',
                        images_upload_handler: function(blobInfo, progress) {
                            return new Promise((resolve, reject) => {
                                let xhr = new XMLHttpRequest();
                                xhr.open('POST', '/upload-image', true);
                                xhr.setRequestHeader('X-CSRF-TOKEN', '{{ csrf_token() }}');
                                xhr.upload.onprogress = function(e) {
                                    progress(e.loaded / e.total * 100);
                                };
                                xhr.onload = function() {
                                    let json = JSON.parse(xhr.responseText);
                                    if (!json || typeof json.location !== 'string') reject(
                                        'Invalid JSON');
                                    resolve(json.location);
                                };
                                xhr.onerror = function() {
                                    reject('Upload failed due to a network error.');
                                };
                                let formData = new FormData();
                                formData.append('file', blobInfo.blob(), blobInfo.filename());
                                xhr.send(formData);
                            });
                        },
                        setup: function(editor) {
                            let timeout = null;

                            editor.on('change', function() {
                                clearTimeout(timeout);
                                timeout = setTimeout(() => {
                                    let newContent = editor.getContent();
                                    if (newContent !== @this.body) {
                                        Livewire.dispatch('updateBody', { content: editor.getContent() });
                                    }
                                }, 500);
                            });

                            Livewire.hook('message.processed', (message, component) => {
                                let newContent = @this.body || "";
                                if (editor.getContent() !== newContent) {
                                    editor.setContent(newContent);
                                }
                            });
                        }

                    });
                }
            };
        };
    </script>
@endpush
