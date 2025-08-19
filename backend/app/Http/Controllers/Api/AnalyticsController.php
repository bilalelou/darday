<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Rental;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class AnalyticsController extends Controller
{
    public function getData()
    {
        // 1. الإيرادات الشهرية لآخر 12 شهر
        $monthlyRevenue = Rental::select(
                DB::raw('SUM(total) as revenue'),
                DB::raw("DATE_TRUNC('month', created_at) as month")
            )
            ->where('created_at', '>=', Carbon::now()->subYear())
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($item) => [
                'month' => Carbon::parse($item->month)->format('M'),
                'revenue' => (int)$item->revenue,
            ]);

        // 2. المستخدمون الجدد لآخر 12 شهر
        $newUsers = User::select(
                DB::raw('COUNT(id) as count'),
                DB::raw("DATE_TRUNC('month', created_at) as month")
            )
            ->where('created_at', '>=', Carbon::now()->subYear())
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($item) => [
                'month' => Carbon::parse($item->month)->format('M'),
                'count' => $item->count,
            ]);

        // 3. العقارات الأكثر إيجاراً
        $topProperties = Rental::with('property')
            ->select('property_id', DB::raw('COUNT(property_id) as rental_count'))
            ->groupBy('property_id')
            ->orderBy('rental_count', 'desc')
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'name' => $item->property->title ?? 'عقار محذوف',
                'rentals' => $item->rental_count,
            ]);

        // 4. إحصائيات رئيسية
        $kpis = [
            'totalRevenue' => Rental::sum('total'),
            'totalUsers' => User::count(),
            'totalProperties' => Property::count(),
            'totalRentals' => Rental::count(),
        ];

        return response()->json([
            'monthlyRevenue' => $monthlyRevenue,
            'newUsers' => $newUsers,
            'topProperties' => $topProperties,
            'kpis' => $kpis,
        ]);
    }
}
