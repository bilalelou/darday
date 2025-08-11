<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request, $listingId)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $listing = Listing::find($listingId);

        if (!$listing) {
            return response()->json(['message' => 'Listing not found'], 404);
        }

        $user = Auth::user();

        $existingReview = Review::where('user_id', $user->id)
                                ->where('listing_id', $listingId)
                                ->first();

        if ($existingReview) {
            return response()->json(['message' => 'You have already reviewed this listing'], 422);
        }

        $review = new Review([
            'user_id' => $user->id,
            'listing_id' => intval($listingId),
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        $review->save();

        $review->load('user');

        return response()->json($review, 201);
    }
}
