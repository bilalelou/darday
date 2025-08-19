<?php

// تأكد من أن المسار صحيح
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index() { return City::latest()->get(); }

    public function store(Request $request) {
        $validated = $request->validate(['name' => 'required|string|unique:cities|max:255']);
        return response()->json(City::create($validated), 201);
    }

    public function update(Request $request, City $city) {
        $validated = $request->validate(['name' => 'required|string|unique:cities,name,' . $city->id . '|max:255']);
        $city->update($validated);
        return response()->json($city);
    }

    public function destroy(City $city) {
        $city->delete();
        return response()->json(null, 204);
    }
}

