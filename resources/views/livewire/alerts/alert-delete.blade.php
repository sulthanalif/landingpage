{{--  modal --}}
<x-modal wire:model="modalAlertDelete" class="backdrop-blur">
    <x-form wire:submit="delete" class="relative" no-separator>
        <div class="flex justify-center items-center">
                <div class="mb-5 rounded-lg w-full text-center">
                <x-icon name="c-shield-exclamation" class="w-16 h-16 text-red-700 mx-auto mb-4" />
                <p class="text-center">Apakah anda yakin untuk menghapus data ini?</p>
            </div>
        </div>
        <x-slot:actions>
            <x-button label="Tidak" @click="$wire.modalAlertDelete = false" />
            <x-button label="Ya" class="btn-primary" type="submit" spinner="delete" />
        </x-slot:actions>
    </x-form>
</x-modal>

