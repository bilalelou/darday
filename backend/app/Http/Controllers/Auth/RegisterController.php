<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // تقسيم الاسم إلى الاسم الأول والأخير
        $nameParts = explode(' ', $validatedData['name'], 2);
        $firstName = $nameParts[0];
        $lastName = $nameParts[1] ?? '';

        $user = User::create([
            'name' => $validatedData['name'],
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'status' => 'نشط', // تعيين الحالة الافتراضية
        ]);

        // تعيين الدور الافتراضي "customer"
        $user->assignRole('customer');

        // إنشاء توكن للمستخدم الجديد
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
