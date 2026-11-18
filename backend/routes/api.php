<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\GalleryController;

/* ---------- PUBLIC ROUTES ---------- */
Route::get('/news',            [NewsController::class, 'index']);
Route::get('/news/{slug}',     [NewsController::class, 'show']);
Route::get('/tours',           [TourController::class, 'index']);
Route::get('/music',           [MusicController::class, 'index']);
Route::get('/galleries',       [GalleryController::class, 'index']);
    // Upload
    Route::post('/upload', [\App\Http\Controllers\UploadController::class, 'store']);

/* ---------- AUTH ROUTES ---------- */
Route::post('/login', [AuthController::class, 'login']);

/* ---------- PROTECTED ROUTES (Admin) ---------- */
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD News
    Route::post('/news',         [NewsController::class, 'store']);
    Route::put('/news/{id}',     [NewsController::class, 'update']);
    Route::delete('/news/{id}',  [NewsController::class, 'destroy']);

    // CRUD Tours
    Route::post('/tours',        [TourController::class, 'store']);
    Route::put('/tours/{id}',    [TourController::class, 'update']);
    Route::delete('/tours/{id}', [TourController::class, 'destroy']);

    // CRUD Music
    Route::post('/music',        [MusicController::class, 'store']);
    Route::put('/music/{id}',    [MusicController::class, 'update']);
    Route::delete('/music/{id}', [MusicController::class, 'destroy']);

    // CRUD Galleries
    Route::post('/galleries',        [GalleryController::class, 'store']);
    Route::put('/galleries/{id}',    [GalleryController::class, 'update']);
    Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);
});