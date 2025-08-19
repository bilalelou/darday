<?php

// تأكد من أن المسار صحيح
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use Illuminate\Http\Request;

class PropertyTypeController extends Controller
{
    public function index() { return PropertyType::latest()->get(); }

    public function store(Request $request) {
        $validated = $request->validate(['name' => 'required|string|unique:property_types|max:255']);
        return response()->json(PropertyType::create($validated), 201);
    }

    public function update(Request $request, PropertyType $propertyType) {
        $validated = $request->validate(['name' => 'required|string|unique:property_types,name,' . $propertyType->id . '|max:255']);
        $propertyType->update($validated);
        return response()->json($propertyType);
    }

    public function destroy(PropertyType $propertyType) {
        $propertyType->delete();
        return response()->json(null, 204);
    }
}
