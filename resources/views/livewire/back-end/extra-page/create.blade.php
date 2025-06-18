<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Extracurricular" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-file label='Image' wire:model="image" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
            change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
            crop-save-text="Crop" :crop-config="$config" hint="Image ratio (4:3), Max 10MB">
                <img id="previewImage" src="{{ asset($oldImage) }}" class="h-40 rounded-lg"  />
            </x-file>
        </div>

        <div>
            <x-input label="Name" type="text" wire:model="name" required/>
        </div>

        <div>
            <x-textarea label="Description" wire:model="description" rows="4"/>
        </div>

        <div class="my-3">
            <x-toggle label="Status" wire:model="status" hint="if checked, status will be active" />
        </div>

        <x-slot:actions>
            @if ($this->recordId != null)
                <x-button label="Delete" icon="o-trash" class="btn-danger" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
            @endif
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
