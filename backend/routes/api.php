<?php

use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\RentalController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserDashboardController;
use App\Http\Controllers\Api\FavoriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/listings/{id}', [ListingController::class, 'show']);

// مسار عام لجلب العقارات المتاحة
Route::get('/properties', [PropertyController::class, 'getAvailableProperties']);

// مسار عام لجلب تفاصيل عقار واحد
Route::get('/properties/{property}', [PropertyController::class, 'publicShow']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    // Route::post('/listings', [ListingController::class, 'store']);
    // Route::post('/listings/{listingId}/reviews', [ReviewController::class, 'store']);

    Route::get('/admin/users', [UserController::class, 'index'])->middleware('role:admin');
    Route::post('/admin/users', [UserController::class, 'store'])->middleware('role:admin');
    Route::get('/admin/users/{user}', [UserController::class, 'show'])->middleware('role:admin');
    Route::put('/admin/users/{user}', [UserController::class, 'update'])->middleware('role:admin');
    Route::delete('/admin/users/{user}', [UserController::class, 'destroy'])->middleware('role:admin');
    Route::get('/admin/users/{user}/rentals', [UserController::class, 'getRentals'])->middleware('role:admin');

    Route::get('/admin/rentals', [RentalController::class, 'index'])->middleware('role:admin');
    Route::get('/admin/rentals/stats', [RentalController::class, 'getStats'])->middleware('role:admin');

    Route::get('/admin/properties', [PropertyController::class, 'index'])->middleware('role:admin');
    Route::post('/admin/properties', [PropertyController::class, 'store'])->middleware('role:admin');
    Route::get('/admin/properties/{property}', [PropertyController::class, 'show'])->middleware('role:admin');
    Route::post('/admin/properties/{property}', [PropertyController::class, 'update'])->middleware('role:admin');
    Route::delete('/admin/properties/{property}', [PropertyController::class, 'destroy'])->middleware('role:admin');

    Route::get('/admin/dashboard-data', [DashboardController::class, 'getData'])->middleware('role:admin');
    // Admin routes
    // Route::prefix('admin')->group(function () {
    //     Route::put('/users/{id}', [UserController::class, 'update']);
    //     Route::patch('/users/{id}/toggle-status', [UserController::class, 'toggleStatus']);
    //     Route::get('/users-stats', [UserController::class, 'getStats']);
    // });

    Route::get('/user/dashboard', [UserDashboardController::class, 'getData'])->middleware('auth:sanctum');
    Route::get('/user/rentals-history', [UserDashboardController::class, 'getRentalsHistory'])->middleware('auth:sanctum');

    // User profile routes
    Route::get('/user/profile', [UserDashboardController::class, 'getProfile'])->middleware('auth:sanctum');
    Route::put('/user/profile', [UserDashboardController::class, 'updateProfile'])->middleware('auth:sanctum');
    Route::put('/user/password', [UserDashboardController::class, 'updatePassword'])->middleware('auth:sanctum');

    // مسارات المفضلة
    Route::get('/user/favorites', [FavoriteController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/favorites', [FavoriteController::class, 'store'])->middleware('auth:sanctum');
    Route::delete('/favorites/{property_id}', [FavoriteController::class, 'destroy'])->middleware('auth:sanctum');
    Route::get('/favorites/status/{property_id}', [FavoriteController::class, 'status'])->middleware('auth:sanctum');
});
