<x-drawer wire:model="drawerReason" title="Reason" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">
    <x-form  wire:submit='saveReason'>
        <x-textarea label="Reason" wire:model="reason" rows="3"/>
        <x-choices-offline
            label="Color"
            wire:model="color"
            :options="$colorsSearchable"
            search-function="searchColor"
            placeholder="Search ..."
            single
            clearable
            searchable >
                @scope('item', $color)
                    <x-list-item :item="$color">
                        <x-slot:actions>
                            <div class="w-8 h-8 rounded-full border-4 {{ $color['id'] }}"></div>
                        </x-slot:actions>
                    </x-list-item>
                @endscope

                {{-- Selection slot--}}
                @scope('selection', $color)
                     <div class="w-full px-2 py-1 rounded border-4 {{ $color['id'] }}">{{ $color['name'] }}</div>
                @endscope
            </x-choices-offline>
        <x-slot:actions>
            <x-button label="Save" icon="o-check" class="btn-primary" type="submit" spinner="saveReason" />
        </x-slot:actions>
    </x-form>

    <x-table :headers="[
        ['key' => 'reason', 'label' => 'Reason'],
        ['key' => 'css', 'label' => 'Css'],
        ['key' => 'code', 'label' => 'Code']
    ]" :rows="$reasons" show-empty-text>
    @scope('actions', $data)
        <x-button class="btn-sm bg-error" icon="o-trash" wire:click="deleteReason({{ $data->id }})" spinner="deleteReason({{ $data->id }})" />
    @endscope
    </x-table>
</x-drawer>
