<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PropertyTypeSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\PropertyType::create(['name' => 'شقة']);
        \App\Models\PropertyType::create(['name' => 'فيلا']);
        \App\Models\PropertyType::create(['name' => 'استوديو']);
    }
}
