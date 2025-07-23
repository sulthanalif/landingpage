<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Question;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Livewire\Attributes\Title;
use Illuminate\Pagination\LengthAwarePaginator;

new #[Title('Questions')] class extends Component {
   use Toast, ManageDatas, WithPagination, WithFileUploads;

    public string $search = '';

    public bool $drawer = false;
    public bool $myModal = false;
    public bool $modalAlertDelete = false;
    public bool $modalAlertWarning = false;
    public bool $upload = false;

    //table
    public array $selected = [];
    public array $sortBy = ['column' => 'created_at', 'direction' => 'desc'];
    public int $perPage = 5;

    //varQuestion
    public string $question = '';
    public string $answer = '';
    public bool $status = true;
    public array $varQuestion = ['recordId', 'question', 'answer', 'status'];

    //select status
    public array $selectStatus = [['id' => true, 'name' => 'Aktif'], ['id' => false, 'name' => 'Tidak aktif']];


    public function save(): void
    {
        $this->setModel(new Question());

        $this->saveOrUpdate(
            validationRules: [
                'question' => 'required|string|max:255',
                'status' => 'required|boolean',
                'answer' => 'nullable|string|max:500',
            ],
        );

        $this->unsetModel();
        $this->reset($this->varQuestion);
        $this->drawer = false;
    }



    public function delete(): void
    {
        $this->setModel(new Question());

        foreach ($this->selected as $id) {
            $this->setRecordId($id);
            $this->deleteData();
        }

        $this->reset('selected');
        $this->unsetRecordId();
        $this->unsetModel();
        $this->modalAlertDelete = false;
    }


    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function datas(): LengthAwarePaginator
    {
        return Question::query()
            ->where(function ($query) {
                $query->where('question', 'like', "%{$this->search}%");
            })
            ->orderBy($this->sortBy['column'], $this->sortBy['direction'])
            ->paginate($this->perPage);
    }

    public function headers(): array
    {
        return [['key' => 'question', 'label' => 'Question'], ['key' => 'answer', 'label' => 'Answer'], ['key' => 'status', 'label' => 'Status'], ['key' => 'created_at', 'label' => 'Created At']];
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
        $js('create', () => {
            $wire.recordId = null;
            $wire.question = '';
            $wire.answer = '';
            $wire.status = true;
            $wire.drawer = true;
            $wire.$refresh();
        })

        $js('detail', (question) => {
            $wire.recordId = question.id;
            $wire.question = question.question;
            $wire.answer = question.answer;
            $wire.status = question.status;
            $wire.drawer = true;
            $wire.$refresh();
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Questions" separator>
        <x-slot:actions>
            @can('question-create')
                <x-button label="Create" @click="$js.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce.500ms="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            with-pagination @row-click="$js.detail($event.detail)">
            @scope('cell_answer', $data)
                {{ Str::limit(strip_tags($data['answer']), 70) }}
            @endscope
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

    <!-- DRAWER CREATE -->
    @include('livewire.back-end.question-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file')
</div>
