<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Tentang Kami',
                'description' => 'Tentang Sekolah Kami',
            ],
            [
                'name' => 'Berita',
                'description' => 'Berita Sekolah Kami',
            ],
            [
                'name' => 'Kegiatan',
                'description' => 'Kegiatan Sekolah Kami',
            ],
            [
                'name' => 'Guru',
                'description' => 'Guru Sekolah Kami',
            ],
            [
                'name' => 'Siswa',
                'description' => 'Siswa Sekolah Kami',
            ],
            [
                'name' => 'Prestasi',
                'description' => 'Prestasi Sekolah Kami',
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
