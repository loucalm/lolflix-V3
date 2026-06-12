<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FavoriteController;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page de présentation (publique)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Ton Dashboard Lolflix sécurisé
Route::get('/dashboard', function () {
    $videos = Video::all()->groupBy('category');
    $favorites = Auth::user()->favoriteVideos;

    return Inertia::render('Dashboard', [
        'videosByCategory' => $videos,
        'favorites' => $favorites
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Le système d'action de favoris
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/videos/{video}/favorite', [FavoriteController::class, 'toggle'])->name('videos.favorite');
});

// CRITIQUE : Ces routes de profil sont indispensables pour AuthenticatedLayout.jsx !
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// TRÈS IMPORTANT : Cette ligne charge toutes les routes de connexion/inscription de Breeze (Login, Register...)
require __DIR__ . '/auth.php';
