<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    /**
     * عرض قائمة بجميع العناصر المتوفرة.
     */
    public function index()
    {
        return response()->json(Amenity::all());
    }
}
