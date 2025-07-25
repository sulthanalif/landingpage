<?php
use App\ManageDatas;
use App\Models\Career;
use Mary\Traits\Toast;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;
use Illuminate\Support\Collection;


new class extends Component {
    use Toast, ManageDatas;

    public bool $formCreate = false;

    public $career;

    //choices
    public Collection $levels;
    public Collection $employmentTypes;

    //variables
    #[Url]
    public string $slug = '';
    public string $title = '';
    public string $description = '';
    public string $requirement = '';
    public string $level = '';
    public string $employment_type = '';
    public string $location = '';
    public int $salary_min = 0;
    public int $salary_max = 0;
    public string $start_date = '';
    public $end_date;

    public bool $is_period = false;
    public bool $is_salary = false;

    public array $varCareer = ['recordId', 'slug', 'title', 'description', 'is_period', 'requirement', 'level', 'employment_type', 'location', 'salary_min', 'salary_max', 'start_date', 'end_date'];

    public function mount()
    {
        if ($this->slug) {
            $career = Career::query()->where('slug', $this->slug)->first();
            $this->recordId = $career->id;
            $this->title = $career->title;
            $this->description = $career->description;
            $this->requirement = $career->requirement;
            $this->level = $career->level;
            $this->employment_type = $career->employment_type;
            $this->location = $career->location;
            $this->salary_min = $career->salary_min;
            $this->salary_max = $career->salary_max;
            $this->start_date = $career->start_date;
            $this->end_date = $career->end_date;
            $this->formCreate = false;

            if ($this->end_date) {
                $this->is_period = true;
            }

            if($this->salary_min || $this->salary_max) {
                $this->is_salary = true;
            }
        } else {
            $this->formCreate = true;
        }

        $this->searchLevel();
        $this->searchEmploymentType();
    }

    public function back(): void
    {
        $this->redirect(route('career'), navigate: true);
    }

    public function searchLevel(string $value = '')
    {
        $options = collect([
            ['id' => 'fresh_graduate', 'name' => 'Fresh Graduate'],
            ['id' => 'experienced', 'name' => 'Experienced'],
        ]);

        $selectedOption = $options->firstWhere('id', $this->level);

        $this->levels = $options
            ->filter(fn ($item) => str_contains(strtolower($item['name']), strtolower($value)))
            ->when($selectedOption, fn ($collection) => $collection->prepend($selectedOption))
            ->unique('id')
            ->values();
    }

    public function searchEmploymentType(string $value = '')
    {
        $options = collect([
            ['id' => 'full_time', 'name' => 'Full Time'],
            ['id' => 'part_time', 'name' => 'Part Time'],
            ['id' => 'contract', 'name' => 'Contract'],
            ['id' => 'freelance', 'name' => 'Freelance'],
            ['id' => 'internship', 'name' => 'Internship'],
        ]);

        $selectedOption = $options->firstWhere('id', $this->employment_type);

        $this->employmentTypes = $options
            ->filter(fn ($item) => str_contains(strtolower($item['name']), strtolower($value)))
            ->when($selectedOption, fn ($collection) => $collection->prepend($selectedOption))
            ->unique('id')
            ->values();
    }

    public function save(): void
    {
        $this->setModel(new Career());

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirement' => 'nullable|string',
            'level' => 'required|in:fresh_graduate,experienced',
            'employment_type' => 'required|in:full_time,part_time,contract,freelance,internship',
            'location' => 'required|string|max:255',
        ];

        if($this->end_date) {
            if ($this->is_period) {
                $rules['start_date'] = 'nullable|date';
                $rules['end_date'] = 'nullable|date|after_or_equal:start_date';
            } else {
                $rules['start_date'] = 'nullable|date';
            }
        } else {
            $rules['start_date'] = 'nullable|date';
        }

        if($this->is_salary == 1) {
            $rules['salary_min'] = 'required|numeric|min:1';
            $rules['salary_max'] = 'nullable|numeric';
        }


        $this->saveOrUpdate(
            validationRules: $rules,
            // diff: ['end_date'],
            beforeSave: function ($career, $component) {
                $career->slug = Str::slug($component->title);

                if($component->is_period) {
                    if($component->end_date) {
                        $career->end_date = $component->end_date;
                    }
                } else {
                    $career->end_date = null;
                }

                if($component->is_salary) {
                    $career->salary_min = $component->salary_min;
                    $career->salary_max = $component->salary_max;
                } else {
                    $career->salary_min = 0;
                    $career->salary_max = 0;
                }
            },
        );

        $this->reset($this->varCareer);
        $this->unsetModel();
        $this->unsetRecordId();

        $this->success('Data created.', position: 'toast-bottom', redirectTo: route('career'));
    }

    public function delete(): void
    {
        $this->setModel(new Career());
        $this->deleteData();
        $this->unsetModel();
        $this->unsetRecordId();

        $this->success('Data deleted.', position: 'toast-bottom', redirectTo: route('career'));
    }

}?>

<div>
    <!-- HEADER -->
    <x-header title="{{ $formCreate ? 'Create' : 'Edit' }} Careers" separator>
        <x-slot:actions>
            <x-button label="Back" @click="$wire.back" responsive icon="o-arrow-left" spinner="back" />
        </x-slot:actions>
    </x-header>

    <x-card>
        <x-form wire:submit="save">
            <div class="grid grid-cols-2 gap-5">
                <x-input label="Title" type="text" wire:model="title" required />
                <x-input label="Location" type="text" wire:model="location" required />
            </div>

            <div class="grid grid-cols-2 gap-5">
                <x-choices-offline
                label="Level"
                wire:model="level"
                :options="$levels"
                placeholder="Search ..."
                search-function="searchLevel"
                single
                clearable
                searchable required />
                <x-choices-offline
                label="Employment Type"
                wire:model="employment_type"
                :options="$employmentTypes"
                placeholder="Search ..."
                search-function="searchEmploymentType"
                single
                clearable
                searchable required />
            </div>


            <div  x-data="{ show: false }" x-effect="show = $wire.is_salary">
                <div class="grid grid-cols-2 gap-5" x-show="show">
                    <x-input  label="Salary Min" type="number" wire:model="salary_min" />
                    <x-input  label="Salary Max" type="number" wire:model="salary_max" />
                </div>
            </div>
            <div class="mb-4">
                <x-toggle label="Is Salary?" wire:model="is_salary" />
            </div>

            <div class="grid grid-cols-2 gap-5" x-data="{ show: false }" x-effect="show = $wire.is_period">
                <div>
                    <x-datepicker label="Start Date" wire:model="start_date" icon="o-calendar" />
                </div>
                <div x-show="show">
                    <x-datepicker label="End Date" wire:model="end_date" icon="o-calendar" />
                </div>
            </div>

            <div class="mb-4">
                <x-toggle label="Is Period?" wire:model="is_period" />
            </div>

            <div class="grid grid-cols-2 gap-5">
                <x-editor wire:model="description" label="Description" />
                <x-editor wire:model="requirement" label="Requirement" />
            </div>

            <x-slot:actions>
                @if ($this->recordId != null)
                    <x-button label="Delete" icon="o-trash" class="btn-danger" wire:click="delete" spinner="delete" />
                @endif
                <x-button label="{{ $formCreate ? 'Save' : 'Update' }}" icon="o-check" class="btn-primary" type="submit" spinner="save" />
            </x-slot:actions>
        </x-form>
    </x-card>
</div>
