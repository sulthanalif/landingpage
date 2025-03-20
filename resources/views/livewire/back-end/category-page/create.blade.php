<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Category" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-input label="Name" type="text" wire:model="name" />
        </div>

        <div>
            <x-textarea
            label="Description"
            wire:model="description"
            rows="3"/>
        </div>

        <div>
            <x-select label="Status" :options="$selectStatus" wire:model="status" />
        </div>

        <x-slot:actions>
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
