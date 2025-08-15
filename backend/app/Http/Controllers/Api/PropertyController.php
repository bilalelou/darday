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

        $properties = $query->with('images')->latest()->get();

        return response()->json($properties);
    }

    /**
     * عرض بيانات عقار محدد.
     */
    public function show(Property $property)
    {
        return response()->json($property->load('images'));
    }

    /**
     * تخزين عقار جديد في قاعدة البيانات.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'type' => 'required|string',
            'status' => 'required|string',
            'pricePerNight' => 'required|numeric',
            'images.*' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // --- تم التعديل هنا ---
        // تحويل مصفوفة العناصر إلى نص JSON قبل إرسالها إلى قاعدة البيانات
        if (isset($validatedData['amenities'])) {
            $validatedData['amenities'] = json_encode($validatedData['amenities']);
        }

        $property = Property::create($validatedData);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['path' => $path]);
            }
        }

        return response()->json($property->load('images'), 201);
    }

    /**
     * تحديث بيانات عقار محدد.
     */
    public function update(Request $request, Property $property)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'type' => 'required|string',
            'status' => 'required|string',
            'pricePerNight' => 'required|numeric',
            'imagesToDelete' => 'nullable|array',
            'imagesToDelete.*' => 'integer',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // --- تم التعديل هنا ---
        // تحويل مصفوفة العناصر إلى نص JSON قبل تحديث قاعدة البيانات
        if (isset($validatedData['amenities'])) {
            $validatedData['amenities'] = json_encode($validatedData['amenities']);
        } else {
            // في حالة عدم إرسال أي عناصر، يتم حفظها كمصفوفة فارغة
            $validatedData['amenities'] = json_encode([]);
        }

        $property->update($validatedData);

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
     * حذف عقار محدد من قاعدة البيانات.
     */
    public function destroy(Property $property)
    {
        $property->delete();
        return response()->json(null, 204);
    }
}
