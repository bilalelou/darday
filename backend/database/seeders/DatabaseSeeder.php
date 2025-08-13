<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // استدعاء الـ Seeders بالترتيب الصحيح
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ListingSeeder::class,
            // يمكنك إضافة seeders أخرى هنا في المستقبل
        ]);
    }
}
