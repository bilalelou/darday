<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rental; // تأكد من أن لديك موديل باسم Rental

class RentalController extends Controller
{
    /**
     * عرض قائمة بجميع الإيجارات.
     */
    public function index()
    {

        $rentals = Rental::all();

        return response()->json($rentals);
    }
    // app/Http/Controllers/Api/RentalController.php

    /**
     * حساب إحصائيات الإيجارات.
     */
    public function getStats()
    {
        $stats = [
            [
                'label' => 'متأخر',
                'value' => Rental::where('status', 'متأخر')->count(),
                'color' => 'text-red-500'
            ],
            [
                'label' => 'قيد الانتظار',
                'value' => Rental::where('status', 'قيد الانتظار')->count(),
                'color' => 'text-yellow-500'
            ],
            [
                'label' => 'مكتمل',
                'value' => Rental::where('status', 'مكتمل')->count(),
                'color' => 'text-green-500'
            ],
            [
                'label' => 'إيجارات نشطة',
                'value' => Rental::where('status', 'نشط')->count(),
                'color' => 'text-blue-500'
            ],
        ];

        return response()->json($stats);
    }
}
