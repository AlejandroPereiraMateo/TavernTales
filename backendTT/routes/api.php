<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonajeController;
use App\Http\Controllers\CampaniaController;
use App\Http\Controllers\HomeController; 
use App\Http\Controllers\NoticiaController;


Route::get('/saludo', function () {
    return response()->json(['mensaje' => '¡Hola desde Laravel!']);
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/noticias', [NoticiaController::class, 'index']);
Route::post('/noticias', [NoticiaController::class, 'store']);
Route::delete('/noticias/{id}', [NoticiaController::class, 'destroy']);

Route::post('/personajes', [PersonajeController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/home', [HomeController::class, 'index']);
    Route::get('/personajes', [PersonajeController::class, 'index']);
    Route::get('/campanias', [CampaniaController::class, 'index']);
});

