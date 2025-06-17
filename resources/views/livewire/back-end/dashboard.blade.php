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
use Livewire\Volt\Component;
use Livewire\Attributes\Title;
use Illuminate\Support\Collection;

new #[Title('Dashboard')] class extends Component {

    public array $chart = [];
    public string $year = '';
    public Collection $years;
    
    public function mount(): void
    {
        $years = Register::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->get()
            ->map(fn($item) => ['id' => $item->year, 'name' => $item->year]);
        $this->years = $years->isEmpty() ? collect([['id' => now()->year, 'name' => now()->year]]) : $years;
        $this->year = now()->year;
        $this->chart = $this->chartStudentRegistrations();
    }

    public function selectYear(string $year): void
    {
        $this->year = $year;
        $this->chart = $this->chartStudentRegistrations();
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
        $data = [
            collect(range(1, 12))->map(function($month) {
                return Register::whereMonth('created_at', $month)
                    ->whereYear('created_at', $this->year ?: now()->year)
                    ->count();
            })->toArray(),
            // 100,
            // 20,
            // 0,
            // 100,
            // 100,
            // 20,
            // 0,
            // 100,
            // 100,
            // 20,
            // 0,
            // 100,
        ];
        $colors = [];
        $backgroundColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
        ];
        $borderColors = array(
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)', 
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)',
        );
        $datasets = [
            [
                'label' => 'Siswa',
                'data' => $data,
                'fill' => false,
                'borderColor' => $borderColors,
                'backgroundColor' => $backgroundColor,
                'tension' => 0.1,
            ],
        ];
        $chart = [];
        $chart['type'] = 'bar';
        $chart['data'] = [
            'labels' => $labels,
            'datasets' => $datasets,
        ];
        $chart['options'] = [
            'responsive' => true,
            'plugins' => [
                'legend' => [
                    'display' => false,
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
    </x-header>
    <div class="py-4 rounded-b-xl grid md:grid-cols-4 gap-5">
            @foreach ($stats as $stat)
                @if(in_array(auth()->user()->getRoleNames()->first(), explode(', ', $stat['role'])))
                    <x-stat title="{{ $stat['title'] }}" value="{{ $stat['value'] }}" icon="o-{{ $stat['icon'] }}" />
                @endif
            @endforeach
    </div>
    @hasrole('super-admin|admin')
    <x-card title="Statistik Pendaftaran Siswa Baru">
        <x-slot:menu>
            <x-select label="Year" wire:model="year" :options="$years" @change-selection="wire.selecYear($event.detail.value)" />
        </x-slot:menu>
        <div class="flex justify-center">
            <div class="mt-5 w-[950px]">
                <x-chart wire:model="chart" />
            </div>
        </div>
    </x-card>
    @endhasrole
</div>
