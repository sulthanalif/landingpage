<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Register;
use App\Models\Enrollment;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Illuminate\Pagination\LengthAwarePaginator;

new class extends Component {
    use Toast, WithPagination, ManageDatas;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;
    public bool $flip = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    public function detail(Register $register): void
    {
        $this->redirect(route('enrollment.detail', $register), navigate: true);
    }

      public function updatedPerPage(): void
    {
        $this->resetPage();
    }
   public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function datas(): LengthAwarePaginator
    {
        return Register::query()
            // ->withAggregate('approvalRegis', 'status')
            ->withAggregate('table', 'name')
            ->where(function ($query) {
                $query->where('name', 'like', "%{$this->search}%")
                    ->orWhere('email', 'like', "%{$this->search}%")
                    ->orWhere('level', 'like', "%{$this->search}%")
                    ->orWhere('phone', 'like', "%{$this->search}%")
                    ->orWhere('referral_by', 'like', "%{$this->search}%")
                    ->orWhereHas('table',function ($query) {
                        $query->where('name', 'like', "%{$this->search}%");
                    });
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'created_at', 'label' => 'Date'],
            ['key' => 'table_name', 'label' => 'Program'],
            ['key' => 'level', 'label' => 'Level'],
            ['key' => 'name', 'label' => 'Name'],
            // // ['key' => 'gender', 'label' => 'Gender'],
            // // ['key' => 'religion', 'label' => 'Religion'],
            // // ['key' => 'place_of_birth', 'label' => 'Place of Birth'],
            ['key' => 'phone', 'label' => 'Phone'],
            ['key' => 'email', 'label' => 'Email'],
            ['key' => 'referral_by', 'label' => 'Referral By'],
        ];
    }

    public function with(): array
    {
        return [
            'datas' => $this->datas(),
            'headers' => $this->headers(),
        ];
    }
}; ?>

<div>
    <!-- HEADER -->
    <x-header title="Student Registration" separator>
        {{-- <x-slot:actions>
            @can('category-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions> --}}
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live="search" clearable icon="o-magnifying-glass" />
    </div>

    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
             with-pagination @row-click="$wire.detail($event.detail)">
            {{-- @scope('cell_status', $data)
                @if ($data->approvalRegis)
                    @if ($data->approvalRegis->status == 1 && $data->approvalRegis->is_reject == 0)
                        <span class="text-green-500">Approved</span>
                    @elseif ($data->approvalRegis->status == 0 && $data->approvalRegis->is_reject == 1)
                        <span class="text-red-500">Rejected</span>
                    @endif
                @else
                    <span class="text-yellow-500">Pending</span>
                @endif
            @endscope --}}
            @scope('cell_created_at', $data)
            {{ \Carbon\Carbon::parse($data->created_at)->locale('id')->translatedFormat('d F Y H:i') }}
            @endscope
            @scope('cell_referral_by', $data)
            {{ $data->referral_by ?? '-' }}
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        @if ($this->selected)
            <div class="flex justify-end items-center gap-2">
                @can('category-delete')
                    <div class="mt-3 flex justify-end">
                        <x-button label="Hapus" icon="o-trash" wire:click="modalAlertDelete = true" spinner
                            class="text-red-500" wire:loading.attr="disabled" />
                    </div>
                @endcan
                <div class="mt-3 flex justify-end">
                    <x-button label="Change Status" icon="o-arrow-path-rounded-square"
                        wire:click="modalAlertWarning = true" spinner class="text-blue-500"
                        wire:loading.attr="disabled" />
                </div>
            </div>
        @endif
    </x-card>
</div>
