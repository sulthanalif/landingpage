<?php

namespace Database\Seeders;

use App\Models\Calendar;
use App\Models\Color;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            [
                'name' => 'Hari libur Nasional / sekolah',
                'css' => 'bg-red-500',
                'code' => '#ef4444',
            ],
            [
                'name' => 'Kegiatan TK',
                'css' => 'bg-indigo-500',
                'code' => '#a855f7',
            ],
            [
                'name' => 'Kegiatan SD',
                'css' => 'bg-pink-500',
                'code' => '#ec4899',
            ],
            [
                'name' => 'Kegiatan SMP',
                'css' => 'bg-cyan-500',
                'code' => '#0ea5e9',
            ],
            [
                'name' => 'Kegiatan SMA',
                'css' => 'bg-gray-500',
                'code' => '#6b7280',
            ],
            [
                'name' => 'Marketing / Event Khusus',
                'css' => 'bg-green-500',
                'code' => '#22c55e',
            ]
        ];

        Color::insert($colors);
        $colorIds = Color::pluck('id')->toArray();

        $calendarEvents = [
            [
                'label' => 'Ujian Tengah Semester',
                'description' => 'Pelaksanaan Ujian Tengah Semester untuk seluruh siswa.',
                'color_id' => $colorIds[2], // Kegiatan SD
                'start_date' => '2025-03-10',
                'end_date' => '2025-03-14',
            ],
            [
                'label' => 'Libur Hari Raya Idul Fitri',
                'description' => 'Libur nasional dalam rangka Hari Raya Idul Fitri.',
                'color_id' => $colorIds[0], // Hari libur Nasional
                'start_date' => '2025-04-01',
                'end_date' => '2025-04-10',
            ],
            [
                'label' => 'Outing Class ke Museum Nasional',
                'description' => 'Kegiatan belajar di luar kelas ke Museum Nasional untuk siswa kelas 4-6.',
                'color_id' => $colorIds[2], // Kegiatan SD
                'start_date' => '2025-02-20',
                'end_date' => '2025-02-20',
            ],
            [
                'label' => 'Penerimaan Rapor Semester Genap',
                'description' => 'Orang tua/wali murid mengambil rapor di sekolah.',
                'color_id' => $colorIds[2], // Kegiatan SD
                'start_date' => '2025-06-21',
                'end_date' => '2025-06-21',
            ],
            [
                'label' => 'Hari Guru Nasional',
                'description' => 'Peringatan Hari Guru Nasional, kegiatan upacara dan apresiasi guru.',
                'color_id' => $colorIds[0], // Hari libur Nasional
                'start_date' => '2025-11-25',
                'end_date' => '2025-11-25',
            ],
            [
                'label' => 'Class Meeting Semester Ganjil',
                'description' => 'Kegiatan non-akademik pasca ujian semester berupa lomba dan permainan.',
                'color_id' => $colorIds[2], // Kegiatan SD
                'start_date' => '2025-12-15',
                'end_date' => '2025-12-19',
            ],
            [
                'label' => 'Workshop Guru dan Staff',
                'description' => 'Pelatihan peningkatan kapasitas untuk guru dan staff sekolah.',
                'color_id' => $colorIds[5], // Marketing / Event Khusus
                'start_date' => '2025-07-01',
                'end_date' => '2025-07-03',
            ],
            [
                'label' => 'MPLS (Masa Pengenalan Lingkungan Sekolah)',
                'description' => 'Kegiatan orientasi untuk siswa baru.',
                'color_id' => $colorIds[2], // Kegiatan SD
                'start_date' => '2025-07-15',
                'end_date' => '2025-07-17',
            ],
            [
                'label' => 'Try Out Ujian Nasional',
                'description' => 'Simulasi ujian nasional untuk kelas akhir.',
                'color_id' => $colorIds[2], // Kegiatan SD
                'start_date' => '2025-05-05',
                'end_date' => '2025-05-07',
            ],
            [
                'label' => 'Perayaan Hari Kemerdekaan',
                'description' => 'Lomba dan upacara dalam rangka Hari Kemerdekaan RI.',
                'color_id' => $colorIds[0], // Hari libur Nasional
                'start_date' => '2025-08-17',
                'end_date' => '2025-08-17',
            ],
        ];

        foreach ($calendarEvents as $calendar) {
            Calendar::create($calendar);
        }
    }
}
