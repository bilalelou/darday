<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Listing;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function getWishlist(Request $request)
    {
        return $request->user()->wishlist()->get();
    }

    public function toggleWishlist(Request $request, $listingId)
    {
        $user = $request->user();
        $listing = Listing::findOrFail($listingId);

        if ($user->wishlist()->where('listing_id', $listing->id)->exists()) {
            $user->wishlist()->detach($listing);
            return response()->json(['message' => 'Listing removed from wishlist.']);
        } else {
            $user->wishlist()->attach($listing);
            return response()->json(['message' => 'Listing added to wishlist.']);
        }
    }
}
