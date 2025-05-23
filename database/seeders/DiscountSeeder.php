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
                'start_date' => '2023-01-01',
                'end_date' => '2023-12-31',
            ],
            [
                'name' => 'Cildren',
                'percentage' => 20,
                'start_date' => '2023-01-01',
                'end_date' => '2023-12-31',
            ]
        ];

        foreach ($discounts as $discount) {
            \App\Models\Discount::create($discount);
        }
    }
}
