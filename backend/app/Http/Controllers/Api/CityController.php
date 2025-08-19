<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Return all cities as JSON.
     */
    public function index()
    {
        return response()->json(City::all());
    }
}
