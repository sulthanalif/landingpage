<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Activity;
use App\Models\SubActivity;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Rule;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
// use Illuminate\Validation\Rule;
use Mary\Traits\WithMediaSync;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

new #[Title('Form Sub Activity')] class extends Component {
    use Toast, ManageDatas, WithPagination, WithFileUploads, WithMediaSync;

    public array $config = [
        'guides' => true,
        'aspectRatio' => 3/4, // Set to portrait ratio (3:4)
        'viewMode' => 1,
        'responsive' => true,
        'dragMode' => 'move',
        'cropBoxMovable' => true,
        'cropBoxResizable' => true,
    ];
    public array $configLib = [
        'guides' => true,
        'aspectRatio' => 4/3, // Set to landscape ratio (4:3)
        'viewMode' => 1,
        'responsive' => true,
        'dragMode' => 'move',
        'cropBoxMovable' => true,
        'cropBoxResizable' => true,
    ];

    public Activity $activity;


    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    //varSubActivity
    #[Url]
    public ?int $subId = null;
    public string $title = '';
    public string $date = '';
    public string $description = '';
    public ?UploadedFile $image = null;
    public string $oldImage = 'img/upload.png';
    #[Rule(['files.*' => 'image|max:10240'])]
    public array $files = [];
    public array $videoUrls = [];
    public Collection $library;
    public Collection $videos;
    public bool $status = true;

    public function mount(Activity $activity): void
    {
        $this->activity = $activity;
        if ($this->subId) {
            $sub = SubActivity::find($this->subId);
            $this->title = $sub->title;
            $this->date = $sub->date;
            $this->description = $sub->description;
            $this->oldImage = asset('storage/'.$sub->image);
            $this->status = $sub->status;
            $this->library = $sub->library;
            $this->videos = $sub->videos ?? new Collection();
            $this->dispatch('show-videos');
        } else {
            $this->library = new Collection();
            $this->videos = new Collection();
        }
    }
    public function back(): void
    {
        $this->redirect(route('activity.show', $this->activity), navigate: true);
    }

    public function save(): void
    {
        $this->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'description' => 'required|string',
            'image' => 'nullable|image|max:5120',
            'files.*' => 'image|max:5120',
            'videoUrls.*.label' => 'nullable|string',
            'videoUrls.*.url' => 'nullable|url',
        ]);

        try {
            DB::beginTransaction();

            $subActivityData = [
                'title' => $this->title,
                'date' => $this->date,
                'description' => $this->description,
                'status' => $this->status,
            ];

            if ($this->image) {
                $imagePath = $this->image->store('files/activity/sub-activity', 'public');
                $subActivityData['image'] = $imagePath;
            }

            $videoData = [];
            if($this->videos) {
                foreach($this->videos as $video) {
                    $videoData[] = [
                        'label' => $video['label'],
                        'url' => $video['url'],
                    ];
                }
            }
            $subActivityData['videos'] = $videoData;

            if ($this->subId) {
                $subActivity = SubActivity::find($this->subId);
                $subActivity->update($subActivityData);
            } else {
                $subActivity = new SubActivity($subActivityData);
                $subActivity->activity_id = $this->activity->id;
                $subActivity->save();
                // $this->subId = $subActivity->id;
            }

            // Sync images
            $this->syncMedia(model: $subActivity, storage_subpath: '/files/activity/sub-activity',);

            // Update or create video

            DB::commit();
            $this->success('Sub Activity saved successfully!', position: 'toast-bottom', redirectTo: route('activity.show', $this->activity));
        } catch (\Exception $th) {
            DB::rollback();
            Log::channel('debug')->error($th);
            $this->error('Failed to save Sub Activity.', position: 'toast-bottom');
        }
    }
} ?>

@script
    <script>
        const tableVideos = document.getElementById('table-videos');
        const videos = $wire.videos;

        tableVideos.innerHTML = `
            <div class="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700" style="max-height: 400px;">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800 sticky top-0">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black dark:text-black uppercase tracking-wider">Label</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black dark:text-black uppercase tracking-wider">URL</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black dark:text-black uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-videos" class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    </tbody>
                </table>
            </div>
        `;
        const tbodyVideos = document.getElementById('tbody-videos');
        const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `
                    <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No videos available
                    </td>
                `;
                tbodyVideos.appendChild(emptyRow);

        Livewire.on('show-videos', () =>{
            $js.tableVideos();
        })
        $js('tableVideos', () => {
            // Clear existing content first
            tbodyVideos.innerHTML = '';

            if (videos && videos.length > 0) {
                videos.forEach((video, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">${video.label}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400"><a href="${video.url}" target="_blank">${video.url}</a></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">
                            <x-button icon="o-trash" @click="$js.removeVideo(${index})" class="text-red-500" />
                        </td>
                    `;
                    tbodyVideos.appendChild(row);
                });
            } else {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `
                    <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No videos available
                    </td>
                `;
                tbodyVideos.appendChild(emptyRow);
            }
        })

        $js('addVideo', () => {
            if ($wire.videoUrls.label && $wire.videoUrls.url) {
                videos.push({
                    label: $wire.videoUrls.label,
                    url: $wire.videoUrls.url,
                });
                $js.tableVideos();
                // Reset form fields
                $wire.videoUrls = {
                    label: '',
                    url: ''
                };
            }

            // console.log($wire.videos);

        })

        $js('removeVideo', (index) => {
            videos.splice(index, 1);
            $js.tableVideos();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Form Sub Activity" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
        </x-slot:actions>
    </x-header>

    <x-form>
        <x-card>
            <div class="lg:flex gap-2">
                <div class="w-full">
                    <x-input label="Title" type="text" wire:model="title" class="w-full" />
                </div>
                <div class="mt-3 lg:mt-0 lg:w-1/2">
                    <x-datepicker label="Date" wire:model="date" icon="o-calendar" />
                </div>
            </div>

            <div class="mt-3">
                <x-textarea label="Description" wire:model="description" rows='3' />
            </div>

            <div class="mt-3">
                <x-file label='Cover' wire:model="image" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
                change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
                crop-save-text="Crop" :crop-config="$config" hint="image size max 5mb">
                    <img id="previewImage" src="{{ asset($oldImage) }}" class="h-40 rounded-lg"  />
                </x-file>
            </div>

            <div class="my-3">
                <x-toggle label="Status" wire:model="status" />
            </div>
        </x-card>


            <div class="lg:grid grid-cols-2 gap-2 mt-4">
                <x-card title="Image Library" class="mt-4 lg:mt-0">
                    <div>
                        <x-image-library
                        wire:model="files"
                        wire:library="library"
                        :preview="$library"
                        label=""
                        change-text="Change"
                        crop-text="Crop"
                        remove-text="Remove"
                        crop-title-text="Crop image"
                        crop-cancel-text="Cancel"
                        crop-save-text="Crop"
                        add-files-text="Add images"
                        :crop-config="$configLib" />
                    </div>
                </x-card>


                <x-card title="Video Library" class="mt-4 lg:mt-0">
                    <div class="lg:grid grid-cols-2 gap-2">
                        <div>
                            <x-input label="Label" wire:model='videoUrls.label' />
                        </div>
                        <div class="mt-3 lg:mt-0">
                            <x-input label="URL" wire:model='videoUrls.url' />
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <x-button label="Add" @click="$js.addVideo()" class="btn-sm btn-primary" />
                    </div>

                    <div class="mt-4">
                        <div id="table-videos" wire:ignore>

                        </div>
                    </div>
                </x-card>
            </div>

        <x-slot:actions>
            <x-button label="Save" icon="o-check" class="btn-primary" wire:click="save" spinner="save" />
        </x-slot:actions>
        </x-form>
</div>
