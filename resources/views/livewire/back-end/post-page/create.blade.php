<?php

use App\ManageDatas;
use App\Models\Post;
use Mary\Traits\Toast;
use App\Models\Category;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

new #[Title('Form Post')] class extends Component {
    use Toast, ManageDatas, WithFileUploads;

    public bool $modalAlertDelete = false;

    //url
    #[Url]
    public $url_slug = '';
    public array $config = [
        'plugins' => 'autoresize',
        'guides' => false,
        'min_height' => 500,
        'max_height' => 500,
        'statusbar' => false,
    ];


    //varPost
    public string $title = '';
    public string $sub_title = '';
    public string $slug = '';
    public string $published_at = '';
    public string $body = '';
    public ?UploadedFile $image = null;
    public string $oldImage = '';
    public int $user_id = 0;
    public bool $status = true;
    public array $varPost = ['oldImage', 'recordId', 'title', 'sub_title', 'slug', 'body', 'image', 'category_searchable_id', 'user_id', 'status', 'published_at'];

    //select status
    public array $selectStatus = [['id' => true, 'name' => 'Active'], ['id' => false, 'name' => 'Inactive']];

    //selectcategory
    // Selected option
    public ?int $category_searchable_id = null;
    // Options category list
    public Collection $categoriesSearchable;

    public function mount()
    {
        if($this->url_slug) {
            $post = Post::where('slug',$this->url_slug)->first();
            $this->recordId = $post->id;
            $this->title = $post->title;
            $this->sub_title = $post->sub_title;
            $this->published_at = $post->published_at;
            $this->slug = $post->slug;
            $this->body = $post->body;
            $this->oldImage = $post->image ? 'storage/'.$post->image : 'img/upload.png';
            $this->category_searchable_id = $post->category_id;
            $this->status = $post->status;
        } else {
            $this->oldImage = 'img/upload.png';
            $this->published_at = date('Y-m-d');
        }

        $this->searchCategory();
    }


    public function searchCategory(string $value = '')
    {
        $selectedOption = Category::where('id', $this->category_searchable_id)->get();

        $this->categoriesSearchable = Category::query()
            ->where('name', 'like', "%$value%")
            ->orderBy('name')
            ->get()
            ->merge($selectedOption);
    }

    public function generateSlug(string $title): string
    {
        return strtolower(str_replace(' ', '-', $title));
    }

    public function save(): void
    {
        $this->slug = $this->generateSlug($this->title);
        $this->user_id = auth()->user()->id;

        // dd($this->title, $this->slug, $this->category_searchable_id, $this->body, $this->user_id);


        $this->setModel(new Post());

        $this->saveOrUpdate(
            validationRules: [
                'title' => 'required|string|max:255',
                'sub_title' => 'nullable|string|max:255',
                'slug' => 'required|string|max:255',
                'body' => 'required|string',
                'category_searchable_id' => 'required|exists:categories,id',
                'user_id' => 'required|exists:users,id',
                'status' => 'required|boolean',
                'image' => $this->recordId ? 'nullable' : 'required'.'|image|mimes:jpeg,png,jpg,webp|max:2048',
                'published_at' => 'required|date',
            ],

            beforeSave: function ($post, $component) {
                $post->title = $component->title;
                $post->sub_title = $component->sub_title;
                $post->slug = $component->slug;
                $post->body = $component->body;
                $post->category_id = $component->category_searchable_id;
                $post->user_id = $component->user_id;
                $post->status = $component->status;
                $post->published_at = $component->published_at;
                if ($component->image) {
                    if (Storage::disk('public')->exists($component->image)) {
                        Storage::disk('public')->delete($component->image);
                    }

                    $post->image = $component->image->store(path: 'images/post', options: 'public');
                }
            },
            toast: false,
            afterSave: function ($post, $component) {
                $this->success('Post berhasil disimpan', position: 'toast-bottom', redirectTo: route('post'));
            },
        );

    }

    public function delete(): void
    {
        $this->setModel(new Post());

        $this->deleteData(
            beforeDelete: function ($post, $component) {
                if (Storage::disk('public')->exists($component->oldImage)) {
                    Storage::disk('public')->delete($component->oldImage);
                }
            },
            afterDelete: function ($post, $component) {
                $this->success('Post berhasil dihapus', position: 'toast-bottom', redirectTo: route('post'));
            }
        );

        $this->unsetModel();
    }
}; ?>

{{-- @script
    <script>
        tinymce.init({
            selector: 'textarea#body',
            plugins: [
                "advlist", "anchor", "autolink", "charmap", "code", "fullscreen",
                "help", "image", "insertdatetime", "link", "lists", "media",
                "preview", "searchreplace", "table", "visualblocks", "accordion"
                ],
            toolbar: "undo redo |link image accordion | styles | bold italic underline strikethrough | align | bullist numlist",
            });
    </script>
@endscript --}}

<div>
    <!-- HEADER -->
    <x-header title="{{ $recordId != null ? 'Edit' : 'Create' }} Posts" separator>
        <x-slot:actions>
            <x-button label="Back" responsive icon="o-arrow-left" link="{{ route('post') }}" />
        </x-slot:actions>
    </x-header>

    <x-card>
        <x-form wire:submit="save">
            <div class="grid md:grid-cols-2 gap-5">
                <x-input label="Title" wire:model="title" required />

                <x-input label="Sub Title" wire:model="sub_title" />
            </div>

            <div class="grid md:grid-cols-2 gap-5">
                <x-choices-offline
                label="Category"
                wire:model="category_searchable_id"
                :options="$categoriesSearchable"
                placeholder="Search ..."
                search-function="searchCategory"
                single
                searchable
                required/>

                <x-datepicker label="Publish Date" wire:model="published_at" icon="o-calendar" />
            </div>

            <div class="grid md:grid-cols-2 gap-5 ">
                <x-file label='Cover Image' wire:model="image" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
                change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
                crop-save-text="Crop" :crop-config="$config">
                    <img id="previewImage" src="{{ asset($oldImage) }}" class="h-40 rounded-lg"  />
                </x-file>

                <div class="mt-3">
                    <x-toggle label="Status" wire:model="status" hint="if status is true, post will be published" />
                </div>
            </div>

            <div >
                <x-editor label="Description"  wire:model="body" :config="[
                    'toolbar' => 'undo redo |link image accordion | styles | bold italic underline strikethrough | align | bullist numlist',
                    'plugins' => 'media autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen',
                    'statusbar' => false,
                    'height' => 500,
                    'menubar' => true
                ]"/>
            </div>

            <x-slot:actions>
                @if ($recordId != null)
                <x-button label="Delete" icon="o-trash" class="btn-error" wire:click="modalAlertDelete = true" spinner="delete" />
                @endif
                <x-button label="{{ $recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
            </x-slot:actions>
        </x-form>
    </x-card>

    @include('livewire.alerts.alert-delete')
</div>
