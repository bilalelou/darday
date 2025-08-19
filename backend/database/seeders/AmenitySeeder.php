<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Amenity;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        $amenities = ["Wi-Fi", "مكيف هواء", "مطبخ", "تلفاز", "مسبح", "موقف سيارات مجاني", "غسالة", "شرفة"];
        foreach ($amenities as $amenity) {
            Amenity::firstOrCreate(['name' => $amenity]);
        }
    }
}
