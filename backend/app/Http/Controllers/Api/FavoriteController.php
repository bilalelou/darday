<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    // إضافة عقار إلى المفضلة
    public function store(Request $request)
    {
        $request->validate(['property_id' => 'required|exists:properties,id']);

        $favorite = Auth::user()->favorites()->create([
            'property_id' => $request->property_id,
        ]);

        return response()->json($favorite, 201);
    }

    // إزالة عقار من المفضلة
    public function destroy($property_id)
    {
        Auth::user()->favorites()->where('property_id', $property_id)->delete();
        return response()->json(null, 204);
    }

    // التحقق من حالة عقار معين
    public function status($property_id)
    {
        $isFavorite = Auth::user()->favorites()->where('property_id', $property_id)->exists();
        return response()->json(['isFavorite' => $isFavorite]);
    }

    // جلب جميع العقارات المفضلة للمستخدم
    public function index()
    {
        $favorites = Auth::user()->favorites()->with('property.images')->get();
        return response()->json($favorites);
    }
}
