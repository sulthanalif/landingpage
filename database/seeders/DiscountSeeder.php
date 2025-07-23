<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $discounts =
        [
            [
                'name' => 'Biduk',
                'percentage' => 10,
                // 'start_date' => '2023-01-01',
                // 'end_date' => '2023-12-31',
            ],
            [
                'name' => 'Sibling',
                'percentage' => 15,
                // 'start_date' => '2023-01-01',
                // 'end_date' => '2023-12-31',
            ],
            [
                'name' => 'Feeder',
                'percentage' => 0,
                // 'start_date' => '2023-01-01',
                // 'end_date' => '2023-12-31',
            ]
        ];

        \App\Models\Discount::truncate();
        foreach ($discounts as $discount) {
            \App\Models\Discount::create($discount);
        }
    }
}
