<?php

use App\Models\Post;
use App\Models\User;
use App\Models\Career;
use App\Models\MailBox;
use App\Models\Teacher;
use App\Models\Activity;
use App\Models\Campaign;
use App\Models\Category;
use App\Models\Question;
use App\Models\Register;
use App\Models\TuitionFee;
use App\Exports\ExportDatas;
use Livewire\Volt\Component;
use App\Models\CareerRegister;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;

new #[Title('Dashboard')] class extends Component {

    public bool $exportTable = false;
    public $optionsExport = [
        ['id' => 'siswa', 'name' => 'Siswa Baru'],
        ['id' => 'karir', 'name' => 'Pelamar']
    ];

    public ?string $data = 'siswa';
    public string $start_date = '';
    public string $end_date = '';

    public array $chart = [];
    public array $chartRegCareer = [];
    public array $chartJob = [];
    public string $year = '';
    public Collection $years;
    public Collection $levels;
    public Collection $careers;
    public ?string $level = null;
    public ?int $career = null;

    public function mount(): void
    {
        $this->levels = collect(TuitionFee::getAllLevel());
        $this->careers = collect(Career::all());
        // dd($this->levels);
        $years = Register::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->get()
            ->map(fn($item) => ['id' => $item->year, 'name' => $item->year]);
        $this->years = $years->isEmpty() ? collect([['id' => now()->year, 'name' => now()->year]]) : $years;
        $this->year = now()->year;
        $this->chart = $this->chartStudentRegistrations();
        $this->chartRegCareer = $this->chartCareerRegistrations();

        if (auth()->user()->getRoleNames()->first() == 'hrd') {
            $this->data = 'karir';
        }
    }

    public function export()
    {
        $this->validate([
            'data' => 'required',
            'start_date' => 'required',
            'end_date' => 'required|after_or_equal:start_date'
        ]);

        if ($this->data == 'siswa') {
            $datas = Register::where(function ($query) {
                $query->where('created_at', '>=', $this->start_date)
                    ->where('created_at', '<=', $this->end_date);
            })->get()->map(function ($item) {
                return [
                    'LEVEL' => $item->level,
                    'NAME' => $item->name,
                    'GENDER' => $item->gender,
                    'RELIGION' => $item->religion,
                    'PLACE_OF_BIRTH' => $item->place_of_birth,
                    'DATE_OF_BIRTH' => $item->date_of_birth,
                    'PHONE' => $item->phone,
                    'EMAIL' => $item->email,
                    'PREVIOUS_SCHOOL' => $item->previous_school,
                    'HOBBI' => $item->hobbi,
                    'ACHIEVEMENT' => $item->achievement,
                    'FATHER_NAME' => $item->father_name,
                    'PLACE_OF_BIRTH_FATHER' => $item->place_of_birth_father,
                    'DATE_OF_BIRTH_FATHER' => $item->date_of_birth_father,
                    'MOTHER_NAME' => $item->mother_name,
                    'PLACE_OF_BIRTH_MOTHER' => $item->place_of_birth_mother,
                    'DATE_OF_BIRTH_MOTHER' => $item->date_of_birth_mother,
                    'NUMBER_OF_SIBLINGS' => $item->number_of_siblings,
                    'PHONE_PARENT' => $item->phone_parent,
                    'EMAIL_PARENT' => $item->email_parent,
                    'FATHER_ADDRESS' => $item->father_address,
                    'MOTHER_ADDRESS' => $item->mother_address,
                    'STUDENT_RESIDENCE_STATUS' => $item->student_residence_status,
                    'SUBMIT_AT' => $item->created_at,
                ];
            });

            $headers = [
                'LEVEL',
                'NAME',
                'GENDER',
                'RELIGION',
                'PLACE_OF_BIRTH',
                'DATE_OF_BIRTH',
                'PHONE',
                'EMAIL',
                'PREVIOUS_SCHOOL',
                'HOBBI',
                'ACHIEVEMENT',
                'FATHER_NAME',
                'PLACE_OF_BIRTH_FATHER',
                'DATE_OF_BIRTH_FATHER',
                'MOTHER_NAME',
                'PLACE_OF_BIRTH_MOTHER',
                'DATE_OF_BIRTH_MOTHER',
                'NUMBER_OF_SIBLINGS',
                'PHONE_PARENT',
                'EMAIL_PARENT',
                'FATHER_ADDRESS',
                'MOTHER_ADDRESS',
                'STUDENT_RESIDENCE_STATUS',
                'SUBMIT_AT',
            ];

            $title = 'Data Siswa';
        } else {
            $datas = CareerRegister::where(function ($query) {
                $query->where('created_at', '>=', $this->start_date)
                    ->where('created_at', '<=', $this->end_date);
            })->get()->map(function ($item) {
                return [
                    'CAREER' => $item->career->title,
                    'NAME' => $item->name,
                    'EMAIL' => $item->email,
                    'LOCATION' => $item->location,
                    'BIRTH_DATE' => $item->birth_date,
                    'DESCRIPTION' => $item->description,
                    'CV' => $item->cv,
                    'PHONE_NUMBER' => $item->phone_number,
                    'SUBMIT_AT' => $item->created_at,
                ];
            });

            $headers = [
                'CAREER',
                'NAME',
                'EMAIL',
                'LOCATION',
                'BIRTH_DATE',
                'DESCRIPTION',
                'CV',
                'PHONE_NUMBER',
                'SUBMIT_AT',
            ];
            $title = 'Data Pelamar';
        }

        return Excel::download(new ExportDatas($datas, $title, $headers), $title.' '. $this->start_date.' '. $this->end_date . '.xlsx');
    }

    public function selectYear(string $year): void
    {
        $this->year = $year;
        $this->chart = $this->chartStudentRegistrations();
    }

    public function selectLevel($level): void
    {
        // dd('masuk');
        $this->level = $level ?? null;
        // $this->reset('chart');
        $this->chart = $this->chartStudentRegistrations();
    }
    public function selectCareer($id): void
    {
        $career = Career::find($id);
        $this->career = $career ? $career->id : null;
        // $this->reset('chart');
        $this->chartRegCareer = $this->chartCareerRegistrations();
    }

    public function stats(): array
    {
       return [
        [
            'title' => 'Post',
            'value' => Post::where('status', 1)->count(),
            'can' => 'post-page',
            'icon' => 'paper-airplane',
        ],
        [
            'title' => 'Categories',
            'value' => Category::where('status', 1)->count(),
            'can' => 'category-page',
            'icon' => 'tag',
        ],
        [
            'title' => 'Mails',
            'value' => MailBox::when(!in_array(auth()->user()->getRoleNames()->first(), ['admin', 'super-admin']), function ($query) {
                $query->where('to', auth()->user()->getRoleNames()->first());
            })->count(),
            'can' => 'mail-page',
            'icon' => 'envelope',
        ],
        [
            'title' => 'Activities',
            'value' => Activity::where('status', true)->count(),
            'can' => 'activity-page',
            'icon' => 'camera',
        ],
        [
            'title' => 'Questions',
            'value' => Question::where('status', true)->count(),
            'can' => 'question-page',
            'icon' => 'question-mark-circle',
        ],
        [
            'title' => 'Students Registrations',
            'value' => Register::count(),
            'can' => 'enrollment-page',
            'icon' => 'user-plus',
        ],
        [
            'title' => 'Users',
            'value' => User::where('status', true)->count(),
            'can' => 'user-page',
            'icon' => 'users',
        ],
        [
            'title' => 'Campaign',
            'value' => Campaign::where('status', 1)->count(),
            'can' => 'campaign-page',
            'icon' => 'megaphone',
        ],
        [
            'title' => 'Careers',
            'value' => Career::count(),
            'can' => 'career-page',
            'icon' => 'briefcase',
        ],
        [
            'title' => 'Teachers',
            'value' => Teacher::where('status', 1)->count(),
            'can' => 'teacher-page',
            'icon' => 'users',
        ]
       ];
    }

    public function chartStudentRegistrations(): array
    {
        $labels = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        $colors = [];

        if ($this->level) {
            $data = collect(range(1, 12))->map(function($month) {
                return Register::whereMonth('created_at', $month)
                    ->whereYear('created_at', $this->year ?: now()->year)
                    ->when($this->level, function($query) {
                        $query->where('level', $this->level);
                    })
                    ->count();
            })->toArray();

            $datasets = [
                [
                    'label' => $this->level,
                    'data' => $data,
                    'fill' => false,
                    // 'borderColor' => $borderColors,
                    // 'backgroundColor' => $backgroundColor,
                    'tension' => 0.1,
                ],
            ];
        } else {

            $datasets = [];

            foreach($this->levels as $level) {
            $data = collect(range(1, 12))->map(function($month) use ($level) {
                return Register::whereMonth('created_at', $month)
                    ->whereYear('created_at', $this->year ?: now()->year)
                    ->where('level', $level['id'])
                    ->count();
            })->toArray();

                $datasets[] = [
                    'label' => $level['id'],
                    'data' => $data,
                    'fill' => false,
                    // 'borderColor' => $borderColors,
                    // 'backgroundColor' => $backgroundColor,
                    'tension' => 0.1,
                ];
            }
        }

        $chart = [];
        $chart['type'] = 'line';
        $chart['data'] = [
            'labels' => $labels,
            'datasets' => empty($datasets) ? [[
                'label' => 'No Data',
                'data' => array_fill(0, 12, 0),
                'fill' => false,
                'tension' => 0.1,
            ]] : $datasets,
        ];
        $chart['options'] = [
            'responsive' => true,
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
                'title' => [
                    'display' => false,
                    'text' => 'Pendaftaran Siswa Baru '. now()->year,
                    'font' => [
                        'size' => 20,
                    ],
                ],
            ],
        ];
        return $chart;
    }

    public function chartCareerRegistrations(): array
    {
        $labels = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        $colors = [];

        if ($this->career) {
            $data = collect(range(1, 12))->map(function($month) {
                return CareerRegister::whereMonth('created_at', $month)
                    ->whereYear('created_at', $this->year ?: now()->year)
                    ->count();
            })->toArray();

            $datasets = [
                [
                    'label' => Career::find($this->career)->title,
                    'data' => $data,
                    'fill' => false,
                    // 'borderColor' => $borderColors,
                    // 'backgroundColor' => $backgroundColor,
                    'tension' => 0.1,
                ],
            ];
        } else {

            $datasets = [];

            foreach($this->careers as $career) {
            $data = collect(range(1, 12))->map(function($month) use ($career) {
                return CareerRegister::whereMonth('created_at', $month)
                    ->whereYear('created_at', $this->year ?: now()->year)
                    ->where('career_id', $career['id'])
                    ->count();
            })->toArray();

                $datasets[] = [
                    'label' => $career['title'],
                    'data' => $data,
                    'fill' => false,
                    // 'borderColor' => $borderColors,
                    // 'backgroundColor' => $backgroundColor,
                    'tension' => 0.1,
                ];
            }
        }

        $chart = [];
        $chart['type'] = 'line';
        $chart['data'] = [
            'labels' => $labels,
            'datasets' => empty($datasets) ? [[
                'label' => 'No Data',
                'data' => array_fill(0, 12, 0),
                'fill' => false,
                'tension' => 0.1,
            ]] : $datasets,
        ];
        $chart['options'] = [
            'responsive' => true,
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
                'title' => [
                    'display' => false,
                    'text' => 'Pendaftaran Siswa Baru '. now()->year,
                    'font' => [
                        'size' => 20,
                    ],
                ],
            ],
        ];
        return $chart;
    }

    public function with(): array
    {
        return [
            'stats' => $this->stats(),
        ];
    }
}; ?>

@script
    <script>
        $js('export', () => {
            $wire.start_date = '';
            $wire.end_date = '';
            // $wire.data = 'siswa';
            $wire.exportTable = true;
        })
    </script>
@endscript

<div>
    <!-- HEADER -->
    <x-header title="Dashboard" separator>
        <x-slot:actions>
            <x-select label="Year" wire:model="year" :options="$years" @change-selection="$wire.selecYear($event.detail.value)" inline />
            <x-button label="Export"  @click="$js.export" class="btn-primary" />
        </x-slot:actions>
    </x-header>
    <div class="py-4 rounded-b-xl grid md:grid-cols-4 gap-5">
            @foreach ($stats as $stat)
                @can($stat['can'])
                    <x-stat title="{{ $stat['title'] }}" value="{{ $stat['value'] }}" icon="o-{{ $stat['icon'] }}" />
                @endcan
            @endforeach
    </div>
    <div class="grid gap-4">
        @can('chart-student-registrations')
            <x-card title="Statistik Pendaftaran Siswa Baru">
                <x-slot:menu>
                    <div class="w-[300px]">
                        <x-choices-offline
                        wire:model="level"
                        :options="$levels"
                        placeholder="Search Jenjang ..."
                        @change-selection="$wire.selectLevel($event.detail.value)"
                        single
                        searchable />
                    </div>

                </x-slot:menu>
                <div class="flex justify-center">
                    <div class="mt-5 w-[950px]">
                        <x-chart wire:model="chart" />
                    </div>
                </div>
            </x-card>
        @endcan

        @can('chart-career-registrations')
            <x-card title="Statistik Pendaftaran Karir">
                <x-slot:menu>
                    <div class="w-[300px]">
                        <x-choices-offline
                        wire:model="career"
                        :options="$careers"
                        placeholder="Search Karir ..."
                        option-label="title"
                        @change-selection="$wire.selectCareer($event.detail.value)"
                        single
                        searchable />
                    </div>

                </x-slot:menu>
                <div class="flex justify-center">
                    <div class="mt-5 w-[950px]">
                        <x-chart wire:model="chartRegCareer" />
                    </div>
                </div>
            </x-card>
        @endcan
        @can('chart-careers')
        <x-card title="Diagram Karir Tersedia">
            <x-slot:menu>
                <div class="w-[300px]">
                    <x-choices-offline
                    wire:model="career"
                    :options="$careers"
                    placeholder="Search Karir ..."
                    option-label="title"
                    @change-selection="$wire.selectCareer($event.detail.value)"
                    single
                    searchable />
                </div>

            </x-slot:menu>
            <div class="flex justify-center">
                <div class="mt-5 w-[950px]">
                    <x-chart wire:model="chartRegCareer" />
                </div>
            </div>
        </x-card>
        @endcan
    </div>


    <x-drawer title="Export" wire:model='exportTable' right separator with-close-button close-on-escape class="w-full lg:w-1/2 sm:w-1/2">
        <x-form wire:submit='export'>
            @hasrole('super-admin|admin|kepala-sekolah')
            <x-select label="Data" wire:model="data" :options="$optionsExport" />
            @endhasrole
            <x-datepicker label="Start Date" wire:model="start_date" icon="o-calendar" :config="[
                'altFormat' => 'd F Y'
            ]" />
            <x-datepicker label="End Date" wire:model="end_date" icon="o-calendar" :config="[
                'altFormat' => 'd F Y'
            ]" />

            <x-slot:actions>
                <x-button label="Export" type="submit" class="btn-primary" spinner='export' />
            </x-slot:actions>
        </x-form>
    </x-drawer>
</div>
