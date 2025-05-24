<?php

namespace Database\Seeders;

use App\Models\TitleTuitionFee;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TitleTuitionFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TitleTuitionFee::create([
            'value' => 'Tuition Fee Structure for the 2025/2026 Academic Year'
        ]);
    }
}
