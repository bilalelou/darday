<?php

// تأكد من أن المسار صحيح
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index() { return Amenity::latest()->get(); }

    public function store(Request $request) {
        $validated = $request->validate(['name' => 'required|string|unique:amenities|max:255']);
        return response()->json(Amenity::create($validated), 201);
    }

    public function update(Request $request, Amenity $amenity) {
        $validated = $request->validate(['name' => 'required|string|unique:amenities,name,' . $amenity->id . '|max:255']);
        $amenity->update($validated);
        return response()->json($amenity);
    }

    public function destroy(Amenity $amenity) {
        $amenity->delete();
        return response()->json(null, 204);
    }
}
