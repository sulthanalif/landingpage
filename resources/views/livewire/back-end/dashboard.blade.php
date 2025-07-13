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
use Livewire\Volt\Component;
use App\Models\CareerRegister;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;

new #[Title('Dashboard')] class extends Component {

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
            'role' => 'marketing, admin, super-admin',
            'icon' => 'paper-airplane',
        ],
        [
            'title' => 'Categories',
            'value' => Category::where('status', 1)->count(),
            'role' => 'marketing, admin, super-admin',
            'icon' => 'tag',
        ],
        [
            'title' => 'Mails',
            'value' => MailBox::when(!in_array(auth()->user()->getRoleNames()->first(), ['admin', 'super-admin']), function ($query) {
                $query->where('to', auth()->user()->getRoleNames()->first());
            })->count(),
            'role' => 'marketing, admin, hrd, super-admin',
            'icon' => 'envelope',
        ],
        [
            'title' => 'Activities',
            'value' => Activity::where('status', true)->count(),
            'role' => 'admin, super-admin',
            'icon' => 'camera',
        ],
        [
            'title' => 'Questions',
            'value' => Question::where('status', true)->count(),
            'role' => 'admin, super-admin',
            'icon' => 'question-mark-circle',
        ],
        [
            'title' => 'Students Registrations',
            'value' => Register::count(),
            'role' => 'admin, super-admin',
            'icon' => 'user-plus',
        ],
        [
            'title' => 'Users',
            'value' => User::where('status', true)->count(),
            'role' => 'super-admin',
            'icon' => 'users',
        ],
        [
            'title' => 'Campaign',
            'value' => Campaign::where('status', 1)->count(),
            'role' => 'super-admin, marketing',
            'icon' => 'megaphone',
        ],
        [
            'title' => 'Careers',
            'value' => Career::count(),
            'role' => 'super-admin, admin, hrd',
            'icon' => 'briefcase',
        ],
        [
            'title' => 'Teachers',
            'value' => Teacher::where('status', 1)->count(),
            'role' => 'super-admin, admin, hrd',
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

<div>
    <!-- HEADER -->
    <x-header title="Dashboard" separator>
        <x-slot:actions>
            <x-select label="Year" wire:model="year" :options="$years" @change-selection="$wire.selecYear($event.detail.value)" />
        </x-slot:actions>
    </x-header>
    <div class="py-4 rounded-b-xl grid md:grid-cols-4 gap-5">
            @foreach ($stats as $stat)
                @if(in_array(auth()->user()->getRoleNames()->first(), explode(', ', $stat['role'])))
                    <x-stat title="{{ $stat['title'] }}" value="{{ $stat['value'] }}" icon="o-{{ $stat['icon'] }}" />
                @endif
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
        {{-- @can('chart-careers')
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
        @endcan --}}
    </div>
</div>
