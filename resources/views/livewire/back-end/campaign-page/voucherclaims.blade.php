<?php

use Mary\Traits\Toast;
use App\Models\VoucherClaim;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Illuminate\Pagination\LengthAwarePaginator;

new class extends Component {
    use WithPagination, Toast;

    public string $search = '';

    // public bool $drawer = false;
    // public bool $myModal = false;
    // public bool $modalAlertDelete = false;
    // public bool $modalAlertWarning = false;
    // public bool $upload = false;

    //table
    // public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 10;

    public function back(): void
    {
        $this->redirect(route('campaign'), navigate: true);
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
        return VoucherClaim::with('register', 'voucher')
            ->whereHas('register', function ($query) {
                $query->where('name', 'like', "%{$this->search}%")
                    ->orWhere('email', 'like', "%{$this->search}%");
            })
            ->orWhereHas('voucher', function ($query) {
                $query->where('code', 'like', "%{$this->search}%")
                    ->orWhereHas('campaign', function ($query) {
                        $query->where('name', 'like', "%{$this->search}%");
                    });
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [
            ['key' => 'voucher.code', 'label' => 'Code'],
            ['key' => 'register.name', 'label' => 'Name'],
            ['key' => 'register.email', 'label' => 'Email'],
            ['key' => 'voucher.campaign.name', 'label' => 'Campaign'],
            ['key' => 'created_at', 'label' => 'Created At'],
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
    <x-header title="Voucher Claims" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
    </div>

    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination>
            @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
    </x-card>
</div>
