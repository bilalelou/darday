<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rental;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class UserDashboardController extends Controller
{
    public function getData()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // التأكد من أن العلاقة rentals موجودة قبل استخدامها
        if (method_exists($user, 'rentals')) {
            $activeRentals = $user->rentals()->where('status', 'نشط')->count();
            $totalRentals = $user->rentals()->count();
            $totalSpent = $user->rentals()->sum('total');
            $recentRentals = $user->rentals()->with('property.images')->latest()->take(3)->get();
        } else {
            // في حالة عدم وجود العلاقة، يتم إرجاع قيم افتراضية
            $activeRentals = 0;
            $totalRentals = 0;
            $totalSpent = 0;
            $recentRentals = [];
        }

        return response()->json([
            'userName' => $user->first_name ?? $user->name, // استخدام first_name أو name
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
            'region' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        // تحديث الاسم الكامل تلقائياً
        $validatedData['name'] = $validatedData['first_name'] . ' ' . $validatedData['last_name'];

        if ($request->hasFile('profile_image')) {
            // حذف الصورة القديمة إذا كانت موجودة
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }
            // تخزين الصورة الجديدة
            $path = $request->file('profile_image')->store('profiles', 'public');
            $validatedData['profile_image'] = $path;
        }

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

        public function getSettings()
    {
        $user = Auth::user();
        return response()->json([
            'notifications' => $user->notifications,
            'preferences' => $user->preferences,
        ]);
    }

    /**
     * تحديث إعدادات المستخدم المسجل دخوله.
     */
    public function updateSettings(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'notifications' => 'sometimes|array',
            'preferences' => 'sometimes|array',
        ]);

        $user->update($validatedData);

        return response()->json(['message' => 'تم حفظ الإعدادات بنجاح.']);
    }
}
