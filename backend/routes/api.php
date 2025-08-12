<?php

use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/listings', [ListingController::class, 'store']);

    Route::get('/wishlist', [WishlistController::class, 'getWishlist']);
    Route::post('/wishlist/{listingId}', [WishlistController::class, 'toggleWishlist']);
});
