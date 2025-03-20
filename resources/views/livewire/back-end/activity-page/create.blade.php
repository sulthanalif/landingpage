<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Activity" right separator
    with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-datepicker label="Date" wire:model="date" icon="o-calendar" />
        </div>

        <div>
            <x-input label="Title" type="text" wire:model="title" />
        </div>

        <div class="flex justify-center my-3">
            <x-file wire:model="image" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
                change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
                crop-save-text="Crop" :crop-config="$config">
                <img id="previewImage" src="{{ asset($oldImage) }}" class="h-40 rounded-lg"  />
            </x-file>
        </div>

        <div>
            <x-select label="Status" :options="$selectStatus" wire:model="status" />
        </div>

        <x-slot:actions>
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary"
                type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
