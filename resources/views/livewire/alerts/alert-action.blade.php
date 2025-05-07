{{--  modal --}}
<x-modal wire:model="modalAlertAction">
    <x-form wire:submit="saveAction" class="relative" no-separator>
        <div>
                <x-radio label="Select Action" wire:model="status" :options="[
                    ['id' => 'approved', 'name' => 'Approved'],
                    ['id' => 'rejected', 'name' => 'Rejected'],
                ]" inline @change="$js.openNote(event.target.value)" />
        </div>
        <div wire:show='openNote'>
            <x-textarea label="Note" wire:model="note" placeholder="Note..." rows="3" />
        </div>
        <x-slot:actions>
            <x-button label="Save" class="btn-primary" type="submit" spinner="saveAction" />
        </x-slot:actions>
    </x-form>
</x-modal>
