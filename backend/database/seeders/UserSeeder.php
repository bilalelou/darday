<?php

namespace Database\Seeders;

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
        // 1. إنشاء المستخدم المدير
        $admin = User::create([
            'name' => 'Admin User',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'status' => 'نشط',
        ]);
        $admin->assignRole('admin');

        // 2. إنشاء المستخدم الأول
        $customer1 = User::create([
            'name' => 'Ahmed Ali',
            'first_name' => 'Ahmed',
            'last_name' => 'Ali',
            'email' => 'ahmed@example.com',
            'password' => Hash::make('password'),
            'status' => 'نشط',
        ]);
        $customer1->assignRole('customer');

        // 3. إنشاء المستخدم الثاني
        $customer2 = User::create([
            'name' => 'Fatima Zahra',
            'first_name' => 'Fatima',
            'last_name' => 'Zahra',
            'email' => 'fatima@example.com',
            'password' => Hash::make('password'),
            'status' => 'نشط',
        ]);
        $customer2->assignRole('customer');
    }
}
