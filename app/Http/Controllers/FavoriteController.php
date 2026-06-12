<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggle(Video $video)
    {
        // Ajoute ou supprime automatiquement le favori pour l'utilisateur connecté
        Auth::user()->favoriteVideos()->toggle($video->id);

        return back();
    }
}
