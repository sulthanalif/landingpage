<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Question" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-input label="Title" type="text" wire:model="title" />
        </div>

        <div>
            <x-textarea
            label="Description"
            wire:model="description"
            rows="3"/>
        </div>

        <div class="flex justify-between items-center">
            <x-file wire:model="file" label="Receipt" hint="Only Image" accept="image/png, image/jpeg, image/jpg" />
            @if ($this->recordId)
                <x-button label="Download File" @click="$wire.downloadFile" icon="o-arrow-down" class="btn-primary" spinner="downloadFile" />
            @endif
        </div>

        <div class="my-3">
            <x-toggle label="Status" wire:model="status" />
        </div>

        <x-slot:actions>
            @if ($this->recordId != null)
                <x-button label="Delete" icon="o-trash" class="btn-error" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
            @endif
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
