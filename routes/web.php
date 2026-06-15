<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\VideoController;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

// 1. LA RACINE ABSOLUE (/) EST LE CATALOGUE PRINCIPAL
Route::get('/', function (Request $request) {
    // Sécurité : Si l'utilisateur n'est pas connecté ET n'est pas invité -> Redirection vers le Login
    if (!Auth::check() && !session()->get('is_guest')) {
        return redirect()->route('login');
    }

    // Gestion de la barre de recherche
    $search = $request->input('search');

    $query = Video::query();
    if ($search) {
        $query->where('title', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%");
    }

    $allVideos = $query->get();
    $videosByCategory = $allVideos->groupBy('category');

    // Sélection d'une vidéo aléatoire pour la Hero Banner
    $heroVideo = Video::inRandomOrder()->first();

    // Récupération des favoris (uniquement si connecté)
    $favorites = [];
    if (Auth::check()) {
        $favorites = Auth::user()->favoriteVideos;
    }

    return Inertia::render('Dashboard', [
        'videosByCategory' => $videosByCategory,
        'favorites' => $favorites,
        'heroVideo' => $heroVideo,
        'isGuest' => session()->get('is_guest', false),
        'filters' => $request->only(['search'])
    ]);
})->name('catalog'); // La racine s'appelle maintenant 'catalog'

// 2. CONNEXION EN TANT QU'INVITÉ (Reste inchangé)
Route::post('/guest-login', function () {
    session()->put('is_guest', true);
    session()->flash('sound', 'tudum');
    return redirect()->route('catalog');
})->name('guest.login');

// 3. PAGE DE VISIONNAGE (/watch/{id})
Route::get('/watch/{video}', function (Video $video) {
    $relatedVideos = Video::query()
        ->where('id', '!=', $video->id)
        ->inRandomOrder()
        ->limit(8)
        ->get();

    return Inertia::render('Watch', [
        'video' => $video,
        'relatedVideos' => $relatedVideos,
    ]);
})->name('videos.watch');

Route::post('/guest-logout', function () {
    session()->forget('is_guest');
    return redirect()->route('login');
})->name('guest.logout');

// 4. ACTIONS SÉCURISÉES (Profil & Favoris)
Route::middleware('auth')->group(function () {
    Route::post('/videos/{video}/favorite', [FavoriteController::class, 'toggle'])->name('videos.favorite');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 5. ESPACE ADMINISTRATEUR (CRUD VIDÉOS)
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/videos', [VideoController::class, 'index'])->name('admin.videos.index');
    Route::post('/videos', [VideoController::class, 'store'])->name('admin.videos.store');
    Route::patch('/videos/{video}', [VideoController::class, 'update'])->name('admin.videos.update');
    Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('admin.videos.destroy');
});

require __DIR__ . '/auth.php';
