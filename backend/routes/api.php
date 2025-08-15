<?php

use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\RentalController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Api\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/listings/{id}', [ListingController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/listings', [ListingController::class, 'store']);
    Route::post('/listings/{listingId}/reviews', [ReviewController::class, 'store']);

    Route::get('/admin/users', [UserController::class, 'index'])->middleware('role:admin');

    Route::get('/admin/rentals', [RentalController::class, 'index'])->middleware('role:admin');
    Route::get('/admin/rentals/stats', [RentalController::class, 'getStats'])->middleware('role:admin');

    // ... (المسارات الأخرى)
    Route::get('/admin/properties', [PropertyController::class, 'index'])->middleware('role:admin');
    Route::post('/admin/properties', [PropertyController::class, 'store'])->middleware('role:admin');
    Route::get('/admin/properties/{property}', [PropertyController::class, 'show'])->middleware('role:admin');
    Route::post('/admin/properties/{property}', [PropertyController::class, 'update'])->middleware('role:admin');
    Route::delete('/admin/properties/{property}', [PropertyController::class, 'destroy'])->middleware('role:admin');

    // Admin routes
    // Route::prefix('admin')->group(function () {
    //     Route::get('/users', [UserController::class, 'index']);
    //     Route::get('/users/{id}', [UserController::class, 'show']);
    //     Route::put('/users/{id}', [UserController::class, 'update']);
    //     Route::delete('/users/{id}', [UserController::class, 'destroy']);
    //     Route::patch('/users/{id}/toggle-status', [UserController::class, 'toggleStatus']);
    //     Route::get('/users-stats', [UserController::class, 'getStats']);
    // });
});
