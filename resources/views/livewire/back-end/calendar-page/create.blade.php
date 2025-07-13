<x-drawer wire:model="drawer" title="Form Calendar" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-input label="Label" type="text" wire:model="label" />
        </div>

        <div>
            <x-textarea
            label="Description"
            wire:model="description"
            rows="3"/>
        </div>

        <div class="grid grid-cols-2 gap-2">
            <x-datepicker label="Start Date" wire:model="start_date" icon="o-calendar" />
            <x-datepicker label="End Date" wire:model="end_date" icon="o-calendar" />
        </div>

        <div>
            <x-choices-offline
            label="Category"
            wire:model="color_id"
            :options="$categoriesSearchable"
            search-function="searchCategory"
            placeholder="Search ..."
            single
            clearable
            searchable >
                @scope('item', $color)
                    <x-list-item :item="$color">
                        <x-slot:actions>
                            <div class="w-8 h-8 rounded-full border-4 {{ $color->css }}"></div>
                        </x-slot:actions>
                    </x-list-item>
                @endscope

                {{-- Selection slot--}}
                @scope('selection', $color)
                <div class="flex justify-between items-center">
                    <div class="mr-2">{{ $color->name }}</div> <div class="w-4 h-4 rounded-full {{ $color->css }}"></div>
                </div>
                @endscope
            </x-choices-offline>
        </div>

        <div class="my-3">
            <x-toggle label="Status" wire:model="status" />
        </div>

        <x-slot:actions>
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

    <x-header title="Category Option" size="text-xl" separator />
    <x-form  wire:submit='saveColor'>
        <x-input label="name" wire:model="name" />
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
            <x-button label="Save" icon="o-check" class="btn-primary" type="submit" spinner="saveColor" />
        </x-slot:actions>
    </x-form>

    <x-table :headers="[
        ['key' => 'name', 'label' => 'Name'],
        ['key' => 'css', 'label' => 'Color'],
        ['key' => 'code', 'label' => 'Code']
    ]" :rows="$colors" >
    @scope('cell_css', $data)
        <div class="w-8 h-8 rounded-full border-4 {{ $data['css'] }}"></div>
    @endscope
    @scope('actions', $data)
        <x-button class="btn-sm bg-error" icon="o-trash" wire:click="deleteColor({{ $data['id'] }})" spinner="deleteColor{{ $data['id'] }}" />
    @endscope
    </x-table>

</x-drawer>
