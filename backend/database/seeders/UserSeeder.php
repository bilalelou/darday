<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء مستخدم بصلاحيات مدير
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@darday.ma',
            'password' => Hash::make('password123'), // استخدم كلمة مرور قوية هنا
        ]);
        // إعطاء دور 'admin' لهذا المستخدم
        $admin->assignRole('admin');

        // إنشاء مستخدم عادي
        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@darday.ma',
            'password' => Hash::make('password123'), // استخدم كلمة مرور قوية هنا
        ]);
        // إعطاء دور 'user' لهذا المستخدم
        $user->assignRole('user');
    }
}
