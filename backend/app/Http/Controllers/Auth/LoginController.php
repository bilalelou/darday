<?php

// المسار: app/Http/Controllers/Auth/LoginController.php
// تم تعديل هذا الملف ليتجنب استخدام الجلسات بشكل كامل.

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // البحث عن المستخدم عن طريق البريد الإلكتروني
        $user = User::where('email', $request->email)->first();

        // التحقق من وجود المستخدم ومن صحة كلمة المرور
        if (! $user || ! Hash::check($request->password, $user->password)) {
            // إذا كانت البيانات غير صحيحة، أرسل رسالة خطأ
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        // --- إذا كانت البيانات صحيحة ---

        // إنشاء توكن جديد للمستخدم
        $token = $user->createToken('api-token')->plainTextToken;

        // جلب الدور الخاص بالمستخدم
        $user->role = $user->getRoleNames()->first();

        // إرسال التوكن مع معلومات المستخدم
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // إلغاء التوكن المستخدم في الطلب الحالي
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
