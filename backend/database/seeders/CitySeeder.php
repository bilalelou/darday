<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\City::create(['name' => 'الدار البيضاء']);
        \App\Models\City::create(['name' => 'الرباط']);
        \App\Models\City::create(['name' => 'مراكش']);
        \App\Models\City::create(['name' => 'فاس']);
        \App\Models\City::create(['name' => 'طنجة']);
    }
}
