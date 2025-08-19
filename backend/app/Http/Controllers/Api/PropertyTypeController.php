<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use Illuminate\Http\Request;

class PropertyTypeController extends Controller
{
    /**
     * Return all property types as JSON.
     */
    public function index()
    {
        return response()->json(PropertyType::all());
    }
}
