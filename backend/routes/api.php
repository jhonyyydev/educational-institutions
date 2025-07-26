<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InstitutionController;

// Rutas públicas
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    // User informacion
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Institutions - Solo usuarios con permiso 'gestionar-instituciones'
    Route::get('/institutions', [InstitutionController::class, 'index'])
        ->middleware('permission:gestionar-instituciones');
    Route::post('/institutions', [InstitutionController::class, 'store'])
        ->middleware('permission:gestionar-instituciones');
});