<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Question" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-input label="Question" type="text" wire:model="question" />
        </div>

        <div>
            <x-textarea
            label="Answer"
            wire:model="answer"
            rows="3"/>
        </div>

        <div>
            <x-select label="Status" :options="$selectStatus" wire:model="status" />
        </div>

        <x-slot:actions>
            @if ($this->recordId != null)
                <x-button label="Delete" icon="o-trash" class="btn-danger" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
            @endif
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
