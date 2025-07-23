<x-drawer wire:model="drawer" title="Detai Discount" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-choices-offline
                label="Name"
                wire:model="name"
                :options="$names"
                placeholder="Search ..."
                search-function="searchNameDiscount"
                single
                clearable
                searchable required />
        </div>

        <div>
            <x-input label="Percentage" type="text" wire:model="percentage" />
        </div>

        {{-- <div class="grid grid-cols-2 gap-2">
            <x-datepicker label="Start Date" wire:model="start_date" icon="o-calendar" />
            <x-datepicker label="End Date" wire:model="end_date" icon="o-calendar" />
        </div> --}}

        <div class="my-3">
            <x-toggle label="Status" wire:model="status" hint="if checked, status will be active" />
        </div>

        <x-slot:actions>
            {{-- @can('discount-delete')
                @if ($this->recordId != null)
                    <x-button label="Delete" icon="o-trash" class="btn-danger" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
                @endif
            @endcan --}}
            <x-button label="Update" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
