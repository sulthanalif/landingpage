<x-drawer wire:model="drawer" title="{{ $this->recordId != null ? 'Detail' : 'Create' }} Teacher" right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">

    <x-form wire:submit="save">

        <div>
            <x-input label="Teacher ID" type="text" wire:model="code_id" required/>
        </div>

        <div>
            <x-input label="Name" type="text" wire:model="name" required/>
        </div>

        <div>
            <x-input label="Email" type="email" wire:model="email" required/>
        </div>

        <div>
            <x-select label="Category" :options="[
                ['id' => 'Management', 'name' => 'Management'],
                ['id' => 'Educational personel', 'name' => 'Educational personel'],
                ['id' => 'Staff', 'name' => 'Staff'],
                ['id' => 'Expatriate for IB Curricula', 'name' => 'Expatriate for IB Curricula'],
            ]" wire:model="category" />
        </div>

        <div>
            <x-input label="Position" type="text" wire:model="position" required/>
        </div>

        <div>
            <x-input label="Order to" type="number" wire:model="order" required/>
        </div>

        <div>
            <x-textarea wire:model="description" label="Description" rows="3" />
        </div>

        <div class="grid grid-cols-2 mt-3">
            <div>
                <x-file label='Image' wire:model="image" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
                change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
                crop-save-text="Crop" :crop-config="$config" hint="image size max 5mb">
                    <img id="previewImage" src="{{ asset($oldImage) }}" class="h-40 rounded-lg"  />
                </x-file>
            </div>
            <div>
                <x-file label='Maskot' wire:model="logo" accept="image/png, image/jpeg, image/jpg, image/webp" crop-after-change
                change-text="Change" crop-text="Crop" crop-title-text="Crop image" crop-cancel-text="Cancel"
                crop-save-text="Crop" :crop-config="$config" hint="image size max 5mb">
                    <img id="previewImage2" src="{{ asset($oldLogo) }}" class="h-40 rounded-lg"  />
                </x-file>
            </div>
        </div>

        <div class="lg:grid grid-cols-2 gap-2" x-data="{ showNotes: false }" x-effect="showNotes = !$wire.status">
            <div class="my-3 lg:my-0">
                <x-toggle label="Status" wire:model="status" hint="if checked, status will be active" />
            </div>
            <div x-show="showNotes">
                <x-choices
                label="Reason"
                wire:model="reason_id"
                :options="$reasons"
                search-function="searchReason"
                placeholder="Search ..."
                single
                clearable
                searchable >
                    @scope('item', $reason)
                        <x-list-item :item="$reason" value='reason'>
                            <x-slot:actions>
                                <div class="w-8 h-8 rounded-full border-4 {{ $reason['css'] }}"></div>
                            </x-slot:actions>
                        </x-list-item>
                    @endscope

                    {{-- Selection slot--}}
                    @scope('selection', $reason)
                        <div class="w-full px-2 py-1 rounded border-4 {{ $reason['css'] }}">{{ $reason['reason'] }}</div>
                    @endscope
                </x-choices>
            </div>
        </div>

        <x-slot:actions>
            @if ($this->recordId != null)
                <x-button label="Delete" icon="o-trash" class="btn-danger" wire:click="modalAlertDelete = true" spinner wire:loading.attr="disabled" />
            @endif
            <x-button label="{{ $this->recordId != null ? 'Update' : 'Save' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
        </x-slot:actions>
    </x-form>

</x-drawer>
