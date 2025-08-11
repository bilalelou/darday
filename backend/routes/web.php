<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/login', [LoginController::class, 'login']);
Route::post('/api/register', [RegisterController::class, 'register']);
