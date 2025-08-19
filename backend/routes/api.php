<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- استيراد الـ Controllers ---
// Public
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Api\PropertyController;

// Authenticated User
use App\Http\Controllers\Api\UserDashboardController;
use App\Http\Controllers\Api\FavoriteController;

// Admin
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\CityController as AdminCityController;
use App\Http\Controllers\Api\Admin\PropertyTypeController as AdminPropertyTypeController;
use App\Http\Controllers\Api\Admin\AmenityController as AdminAmenityController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\RentalController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- المسارات العامة (لا تتطلب تسجيل الدخول) ---
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/properties', [PropertyController::class, 'getAvailableProperties']);
Route::get('/properties/{property}', [PropertyController::class, 'publicShow']);


// --- المسارات المحمية (تتطلب تسجيل الدخول) ---
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [LoginController::class, 'logout']);

    // --- مسارات المستخدم المسجل ---
    Route::prefix('user')->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'getData']);
        Route::get('/rentals-history', [UserDashboardController::class, 'getRentalsHistory']);
        Route::get('/profile', [UserDashboardController::class, 'getProfile']);
        Route::post('/profile', [UserDashboardController::class, 'updateProfile']); // استخدام POST للتعامل مع FormData
        Route::put('/password', [UserDashboardController::class, 'updatePassword']);
        Route::get('/settings', [UserDashboardController::class, 'getSettings']);
        Route::put('/settings', [UserDashboardController::class, 'updateSettings']);
        Route::get('/favorites', [FavoriteController::class, 'index']);
    });

    // --- مسارات المفضلة (تتطلب مستخدم مسجل) ---
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{property_id}', [FavoriteController::class, 'destroy']);
    Route::get('/favorites/status/{property_id}', [FavoriteController::class, 'status']);


    // --- مسارات المدير (تتطلب دور "admin") ---
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        // Dashboard & Analytics
        Route::get('/dashboard-data', [DashboardController::class, 'getData']);
        Route::get('/analytics', [AnalyticsController::class, 'getData']);

        // Users
        Route::apiResource('users', AdminUserController::class);
        Route::get('/users/{user}/rentals', [AdminUserController::class, 'getRentals']);

        // Properties
        Route::get('/properties', [PropertyController::class, 'index']);
        Route::post('/properties', [PropertyController::class, 'store']);
        Route::get('/properties/{property}', [PropertyController::class, 'show']);
        Route::post('/properties/{property}', [PropertyController::class, 'update']);
        Route::delete('/properties/{property}', [PropertyController::class, 'destroy']);

        // Rentals
        Route::get('/rentals', [RentalController::class, 'index']);
        Route::get('/rentals/stats', [RentalController::class, 'getStats']);

        // Settings (Cities, Types, Amenities)
        Route::apiResource('cities', AdminCityController::class);
        Route::apiResource('property-types', AdminPropertyTypeController::class);
        Route::apiResource('amenities', AdminAmenityController::class);
    });
});
