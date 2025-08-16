<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserDashboardController extends Controller
{
    public function getData()
    {
        $user = Auth::user();

        // حساب الإحصائيات
        $activeRentals = $user->rentals()->where('status', 'نشط')->count();
        $totalRentals = $user->rentals()->count();
        $totalSpent = $user->rentals()->sum('total');

        // جلب آخر 3 إيجارات
        $recentRentals = $user->rentals()->latest()->take(3)->get();

        return response()->json([
            'userName' => $user->first_name,
            'stats' => [
                ['label' => 'الإيجارات النشطة', 'value' => $activeRentals, 'color' => 'text-blue-600'],
                ['label' => 'إجمالي الإيجارات', 'value' => $totalRentals, 'color' => 'text-green-600'],
                ['label' => 'إجمالي المدفوع', 'value' => number_format($totalSpent, 2) . ' د.م.', 'color' => 'text-yellow-500'],
            ],
            'recentRentals' => $recentRentals,
        ]);
    }

    public function getRentalsHistory()
    {
        $user = Auth::user();

        $rentals = $user->rentals()->with('property.images')->latest()->get();

        return response()->json($rentals);
    }

    /**
     * جلب بيانات الملف الشخصي للمستخدم المسجل دخوله.
     */
    public function getProfile()
    {
        return response()->json(Auth::user());
    }

    /**
     * تحديث بيانات الملف الشخصي للمستخدم المسجل دخوله.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
        ]);

        // تحديث الاسم الكامل تلقائياً
        $validatedData['name'] = $validatedData['first_name'] . ' ' . $validatedData['last_name'];

        $user->update($validatedData);

        return response()->json($user);
    }

    /**
     * تحديث كلمة المرور للمستخدم المسجل دخوله.
     */
    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'تم تحديث كلمة المرور بنجاح.']);
    }
}
