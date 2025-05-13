<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Activity" right separator
    with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-datepicker label="Date" wire:model="date" icon="o-calendar" />
        </div>

        <div>
            <x-input label="Title" type="text" wire:model="title" />
        </div>

        <div class="flex justify-between items-center">
            <x-file wire:model="file" label="File" hint="Only Video/Image" accept="video/mp4, image/png, image/jpeg, image/jpg" />
            @if ($this->recordId)
            <x-button label="Download File" @click="$wire.downloadFile" icon="o-arrow-down" class="btn-primary" spinner="downloadFile" />
        @endif
        </div>

        <div>
            <x-select label="Status" :options="$selectStatus" wire:model="status" />
        </div>

        <x-slot:actions>
            @if ($this->recordId != null)
            <x-button label="Delete" icon="o-trash" class="btn-error" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
            @endif
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary"
                type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
