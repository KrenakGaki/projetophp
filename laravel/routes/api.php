<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControleProdutoController;
use App\Http\Controllers\ControleClienteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ClienteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('produtos', [ProdutoController::class]);
Route::get('/produtos', [ControleProdutoController::class, 'index']);
Route::post('/produtos', [ControleProdutoController::class, 'store']);
Route::get('/produtos/{id}', [ControleProdutoController::class, 'show']);
Route::put('/produtos/{id}', [ControleProdutoController::class, 'update']);
Route::delete('/produtos/{id}', [ControleProdutoController::class, 'destroy']);


// routes/web.php
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => csrf_token()]);
});



// Clientes
Route::get('/clientes', [ControleClienteController::class, 'index']);
Route::post('/clientes', [ControleClienteController::class, 'store']);
Route::get('/clientes/{id}', [ControleClienteController::class, 'show']);
Route::put('/clientes/{id}', [ControleClienteController::class, 'update']);
Route::delete('/clientes/{id}', [ControleClienteController::class, 'destroy']);

// Rotas de autenticação

Route::Post('/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::Post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/perfil', [App\Http\Controllers\AuthController::class, 'perfil']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
