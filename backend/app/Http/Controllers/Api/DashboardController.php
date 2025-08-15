<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Rental;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function getData()
    {
        // --- حساب الإحصائيات ---
        $totalUsers = User::count();
        $activeProperties = Property::where('status', '!=', 'صيانة')->count();
        $monthlyRevenue = Rental::whereMonth('created_at', Carbon::now()->month)->sum('total');
        $totalProperties = Property::count();
        $rentedProperties = Property::where('status', 'مؤجر')->count();
        $occupancyRate = ($totalProperties > 0) ? ($rentedProperties / $totalProperties) * 100 : 0;

        $stats = [
            ['title' => 'إجمالي المستخدمين', 'value' => $totalUsers, 'icon' => 'Users'],
            ['title' => 'العقارات النشطة', 'value' => $activeProperties, 'icon' => 'Package'],
            ['title' => 'الإيرادات الشهرية', 'value' => number_format($monthlyRevenue, 2) . ' د.م.', 'icon' => 'DollarSign'],
            ['title' => 'نسبة الإشغال', 'value' => round($occupancyRate) . '%', 'icon' => 'TrendingUp'],
        ];

        // --- بيانات وهمية لآخر الأنشطة ---
        $recentActivity = [
            ['message' => 'تم إنشاء إيجار جديد بواسطة John Doe', 'time' => 'قبل دقيقتين', 'status' => 'success'],
            ['message' => 'تسجيل مستخدم جديد: Sarah Johnson', 'time' => 'قبل 15 دقيقة', 'status' => 'info'],
            ['message' => 'تم استلام دفعة للطلب #R001', 'time' => 'قبل ساعة', 'status' => 'success'],
            ['message' => 'صيانة مستحقة للعقار: شقة #EX-001', 'time' => 'قبل ساعتين', 'status' => 'warning'],
        ];

        // --- بيانات وهمية للإجراءات المعلقة ---
        $pendingActions = [
            ['title' => 'التحقق من المستخدمين معلق', 'description' => '5 مستخدمين ينتظرون التحقق', 'priority' => 'عاجل'],
            ['title' => 'عقود إيجار متأخرة', 'description' => '3 عقود تجاوزت تاريخ انتهاءها', 'priority' => 'عاجل'],
            ['title' => 'صيانة مجدولة', 'description' => '12 عقاراً مجدول للصيانة هذا الأسبوع', 'priority' => 'متوسط'],
        ];

        return response()->json([
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'pendingActions' => $pendingActions,
        ]);
    }
}
