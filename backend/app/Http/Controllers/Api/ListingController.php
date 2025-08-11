<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ListingController extends Controller
{
    public function show($id)
    {
        $listing = Listing::with(['images', 'reviews.user'])->find($id);

        if (!$listing) {
            return response()->json(['message' => 'Listing not found'], 404);
        }

        $averageRating = $listing->reviews->avg('rating');

        $listingData = $listing->toArray();
        $listingData['average_rating'] = $averageRating;

        return response()->json($listingData);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'rooms' => 'required|integer',
            'phone_number' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'is_furnished' => 'required|boolean',
            'images' => 'required|array|max:30',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $listing = Listing::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'rooms' => $request->rooms,
            'phone_number' => $request->phone_number,
            'city' => $request->city,
            'address' => $request->address,
            'is_furnished' => $request->is_furnished,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('public/listings');
                $listing->images()->create([
                    'image_path' => $path,
                ]);
            }
        }

        $listing->load('images');

        return response()->json([
            'success' => true,
            'message' => 'Listing created successfully.',
            'data' => $listing,
        ], 201);
    }
}
