<?php

use App\ManageDatas;
use Mary\Traits\Toast;
use App\Models\Question;
use Livewire\Volt\Component;
use Livewire\WithPagination;
use Livewire\WithFileUploads;
use Illuminate\Pagination\LengthAwarePaginator;

new class extends Component {
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

    public function create(): void
    {
        $this->drawer = true;
        $this->reset($this->varQuestion);
    }

    public function detail($id): void
    {
        $this->reset($this->varQuestion);
        $sub = Question::find($id);
        $this->recordId = $sub->id;
        $this->question = $sub->question;
        $this->answer = $sub->answer;
        $this->status = $sub->status;
        $this->drawer = true;
    }

    public function modalUpload(): void
    {
        $this->upload = true;
        $this->reset('file');
    }

    public function downloadTemplate()
    {
        $file = public_path('templates/template-Question.xlsx');

        if (!file_exists($file)) {
            $this->error('File tidak ditemukan', position: 'toast-bottom');
            return;
        }

        return Response::download($file);
    }

    public function import(): void
    {
        $this->validate([
            'file' => 'required|mimes:xlsx',
        ]);

        try {
            Excel::import(new QuestionImport(), $this->file);

            $this->upload = false;
            $this->reset('file');
            $this->success('Data berhasil diupload', position: 'toast-bottom');
        } catch (\Exception $e) {
            $this->error('Data gagal diupload', position: 'toast-bottom');
            Log::channel('debug')->error("message: {$e->getMessage()}  file: {$e->getFile()}  line: {$e->getLine()}");
        }
    }

    public function export()
    {
        $datas = Question::all();
        $datas = $datas->map(function ($Question) {
            return [
                'name' => $Question->name,
                'status' => $Question->status == true ? 'Aktif' : 'Tidak aktif',
                'created_at' => $Question->created_at->format('Y-m-d'),
            ];
        });

        $headers = ['NAMA', 'STATUS', 'DIBUAT PADA'];

        return Excel::download(new ExportDatas($datas, 'Data Question', $headers), 'Question_' . date('Y-m-d') . '.xlsx');
    }

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

    public function changeStatus(): void
    {
        foreach ($this->selected as $id) {
            $sub = Question::find($id);
            try {
                DB::beginTransaction();
                $sub->status = !$sub->status;
                $sub->save();
                DB::commit();

                $this->success('Status berhasil diubah', position: 'toast-bottom');
                $this->modalAlertWarning = false;
                $this->reset('selected');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::channel('debug')->error("message: '{$e->getMessage()}',  file: '{$e->getFile()}',  line: {$e->getLine()}");
            }
        }
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

<div>
    <!-- HEADER -->
    <x-header title="Questions" separator>
        <x-slot:actions>
            <div>
                <x-button label="Upload" @click="$wire.modalUpload" class="!btn-primary" responsive
                    icon="o-arrow-up-tray" />
            </div>
            <div>
                <x-button label="Download" @click="$wire.export" class="!btn-primary" responsive icon="o-arrow-down-tray"
                    spinner='export' />
            </div>
            @can('question-create')
                <x-button label="Create" @click="$wire.create" responsive icon="o-plus" />
            @endcan
        </x-slot:actions>
    </x-header>

    <div class="flex justify-end items-center gap-5">
        <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
    </div>

    <!-- TABLE  -->
    <x-card class="mt-5">
        <x-table :headers="$headers" :rows="$datas" :sort-by="$sortBy" per-page="perPage" :per-page-values="[5, 10, 50]"
            wire:model.live="selected" selectable with-pagination>
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
            @scope('actions', $data)
                <x-button class="btn-primary btn-sm btn-ghost"><x-icon name="o-pencil" color="primary" @click="$wire.detail({{ $data['id'] }})" /></x-button>
            @endscope
            <x-slot:empty>
                <x-icon name="o-cube" label="It is empty." />
            </x-slot:empty>
        </x-table>
        @if ($this->selected)
            <div class="flex justify-end items-center gap-2">
                @can('question-delete')
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

    <!-- DRAWER CREATE -->
    @include('livewire.back-end.question-page.create')

    <!-- MODAL ALERT DELETE -->
    @include('livewire.alerts.alert-delete')

    <!-- MODAL ALERT WARNING -->
    @include('livewire.alerts.alert-warning')

    <!-- MODAL UPLOAD FILE -->
    @include('livewire.modals.modal-upload-file')
</div>
