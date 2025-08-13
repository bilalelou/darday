<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء دور المدير
        Role::create(['name' => 'admin']);

        // إنشاء دور المستخدم العادي
        Role::create(['name' => 'user']);
    }
}


