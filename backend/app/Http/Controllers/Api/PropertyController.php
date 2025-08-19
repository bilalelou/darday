<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    /**
     * عرض قائمة بالعقارات مع إمكانية الفلترة.
     */
    public function index(Request $request)
    {
        $query = Property::query();

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('city', 'like', '%' . $searchTerm . '%');
            });
        }

        if ($request->filled('type') && $request->input('type') !== 'الكل') {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('status') && $request->input('status') !== 'الكل') {
            $query->where('status', $request->input('status'));
        }

    $properties = $query->with(['images', 'city', 'propertyType', 'amenities'])->latest()->get();

        return response()->json($properties);
    }

    /**
     * عرض بيانات عقار محدد.
     */
    public function show(Property $property)
    {
    return response()->json($property->load(['images', 'city', 'propertyType', 'amenities']));
    }

    /**
     * عرض تفاصيل عقار واحد للعموم.
     */
    public function publicShow(Property $property)
    {
        // التأكد من أن العقار متاح قبل عرضه
        if ($property->status !== 'متاح') {
            return response()->json(['message' => 'هذا العقار غير متاح حالياً.'], 404);
        }

    return response()->json($property->load(['images', 'amenities']));
    }

    /**
     * تخزين عقار جديد في قاعدة البيانات.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city_id' => 'required|integer|exists:cities,id', // <-- تم التعديل هنا
            'property_type_id' => 'required|integer|exists:property_types,id', // <-- تم التعديل هنا
            'description' => 'nullable|string',
            'status' => 'required|string',
            'pricePerNight' => 'required|numeric',
            'bedrooms' => 'required|integer|min:1',
            'bathrooms' => 'required|integer|min:1',
            'area' => 'required|integer|min:1',
            'amenities' => 'nullable|array',
            'amenities.*' => 'integer|exists:amenities,id',
            'images.*' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $amenities = $validatedData['amenities'] ?? null;
        unset($validatedData['amenities']);

        $property = Property::create($validatedData);

        if (!empty($amenities)) {
            $property->amenities()->sync($amenities);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['path' => $path]);
            }
        }

        return response()->json($property->load('images', 'amenities'), 201);
    }

    /**
     * تحديث بيانات عقار محدد.
     */
    public function update(Request $request, Property $property)
    {
        // --- تم التعديل هنا ---
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city_id' => 'required|integer|exists:cities,id', // <-- تم التعديل هنا
            'property_type_id' => 'required|integer|exists:property_types,id', // <-- تم التعديل هنا
            'description' => 'nullable|string',
            'status' => 'required|string',
            'pricePerNight' => 'required|numeric',
            'bedrooms' => 'required|integer|min:1',
            'bathrooms' => 'required|integer|min:1',
            'area' => 'required|integer|min:1',
            'amenities' => 'nullable|array',
            'amenities.*' => 'integer|exists:amenities,id',
            'imagesToDelete' => 'nullable|array',
            'imagesToDelete.*' => 'integer',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Sync amenities separately
        $amenities = $validatedData['amenities'] ?? null;
        unset($validatedData['amenities']);

        $property->update($validatedData);

        if (isset($amenities)) {
            $property->amenities()->sync($amenities);
        }

        if (!empty($validatedData['imagesToDelete'])) {
            $images = $property->images()->whereIn('id', $validatedData['imagesToDelete'])->get();
            foreach ($images as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['path' => $path]);
            }
        }

        return response()->json($property->load('images'));
    }

    /**
     * عرض قائمة بالعقارات المتاحة للعموم.
     */
    public function getAvailableProperties()
    {
    $properties = Property::with(['images', 'city', 'propertyType', 'amenities'])
                ->where('status', 'متاح')
                ->latest()
                ->get();
        info($properties);
        return response()->json($properties);
    }


    /**
     * حذف عقار محدد من قاعدة البيانات.
     */
    public function destroy(Property $property)
    {
        $property->delete();
        return response()->json(null, 204);
    }
}
