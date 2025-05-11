<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonajeController;
use App\Http\Controllers\CampaniaController;

Route::get('/saludo', function () {
    return response()->json(['mensaje' => '¡Hola desde Laravel!']);
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/personajes', [PersonajeController::class, 'index']);
    Route::get('/campanias', [CampaniaController::class, 'index']);
});
