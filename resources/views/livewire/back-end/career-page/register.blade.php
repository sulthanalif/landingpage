<?php

use App\Models\Career;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use App\Models\CareerRegister;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Career Registration')] class extends Component {
    use WithPagination;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 10;

    public ?int $career_id = null;
    public Collection $careers;

    public array $model;
    public string $career_title = '';

    public function mount(): void
    {
        $this->searchCareer();
    }

    public function searchCareer(string $value = '')
    {
        $selectedOption = Career::where('id', $this->career_id)->get();

        $this->careers = Career::query()
            ->where('title', 'like', "%{$value}%")
            ->get()
            ->merge($selectedOption);
    }

    public function back(): void
    {
        $this->redirect(route('career'), navigate: true);
    }

    public function getCareerTitle(): void
    {
        $this->career_title = Career::find($this->model['career_id'])->title;
    }

    public function downloadCv()
    {
        $file = public_path('storage/' . $this->model['cv']);

        if (!file_exists($file)) {
            $this->error('File tidak ditemukan', position: 'toast-bottom');
            return;
        }

        return Response::download($file);
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
        $search = is_string($this->search) ? $this->search : '';

        return CareerRegister::query()
            ->withAggregate('career', 'title')
            ->when($this->career_id, function ($query) {
                $query->whereHas('career', function ($query) {
                    $query->where('id', $this->career_id);
                });
            })
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($this->sortBy['column'] ?? 'id', $this->sortBy['direction'] ?? 'asc')
            ->paginate($this->perPage ?? 10);
    }

    public function headers(): array
    {
        return [
            ['key' => 'created_at', 'label' => 'Date'],
            ['key' => 'name', 'label' => 'Name'],
            ['key' => 'email', 'label' => 'Email'],
            ['key' => 'phone_number', 'label' => 'Phone'],
            ['key' => 'career_title', 'label' => 'Career', 'sortable' => true],
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

@script
    <script>
        $js('detail', (register) => {
            $wire.model = register;
            $wire.getCareerTitle();
            console.log($wire.model);


            $wire.myModal = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Career Registration" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <div class="w-[300px]">
            <x-choices
            wire:model.live="career_id"
            :options="$careers"
            placeholder="Search Career ..."
            search-function="searchCareer"
            option-label="title"
            width="max-w-90"
            single
            searchable
            clearable>
            @scope('selection', $data)
            {{ strlen($data['title']) > 23 ? substr($data['title'], 0, 23) . '...' : $data['title'] }}
            @endscope
            </x-choices>
        </div>
        <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination @row-click="$js.detail($event.detail)">
            @scope('cell_created_at', $data)
                <p>{{ \Carbon\Carbon::parse($data['created_at'] ?? '')->locale('id')->translatedFormat('d F Y H:i') }}</p>
            @endscope
            {{--  @scope('cell_status', $data)
                @if ($data['status'])
                    <span class="text-green-500">Aktif</span>
                @else
                    <span class="text-red-500">Tidak aktif</span>
                @endif
            @endscope --}}
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
    </x-card>

    <x-modal
        wire:model="myModal"
        title="Detail"
        {{-- subtitle="" --}}
        box-class="w-full h-fit max-w-[900px]"
        without-trap-focus
    >
        <div wire:loading.remove='model'>
            <div class="grid grid-cols-2 gap-5">
                <div class="space-y-2 text-sm text-gray-700">
                    <div class="flex">
                        <span class="w-40 font-semibold">Date</span>
                        <span>: {{ $model ? \Carbon\Carbon::parse($model['created_at'] ?? '')->locale('id')->translatedFormat('d F Y H:i') : '' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-40 font-semibold">Name</span>
                        <span>: {{ $model['name'] ?? '' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-40 font-semibold">Email</span>
                        <span>: {{ $model['email'] ?? '' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-40 font-semibold">Phone Number</span>
                        <span>: {{ $model['phone_number'] ?? '' }}</span>
                    </div>

                </div>
                <div class="space-y-2 text-sm text-gray-700">
                    <div class="flex items-start">
                        <span class="w-40 font-semibold shrink-0">Location</span>
                        <span class="break-words">: {{ $model['location'] ?? '-' }}</span>
                    </div>
                    <div class="flex items-start">
                        <span class="w-40 font-semibold shrink-0">Birth Date</span>
                        <span>: {{ $model && isset($model['birth_date']) ? \Carbon\Carbon::parse($model['birth_date'])->locale('id')->translatedFormat('d F Y') : '-' }}</span>
                    </div>
                    <div class="flex items-start">
                        <span class="w-40 font-semibold shrink-0">Career Register</span>
                        <span class="break-words">: {{ $career_title ?: '-' }}</span>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <div class="bg-gray-50 border border-gray-200 rounded p-3">
                    {{ $model['description'] ?? '' }}
                </div>
            </div>

        </div>
        <div class="w-full h-full flex justify-center items-center ">
            <x-loading class="loading-dots py-5" wire:loading='model' />
        </div>
        <x-slot:actions>
            <x-button wire:loading.remove='model' class="btn-primary" label="Download CV" icon="o-arrow-down-tray" @click="$wire.downloadCv" />
        </x-slot:actions>
    </x-modal>
</div>
