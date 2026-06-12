<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    // Afficher la liste des vidéos côté admin
    public function index()
    {
        return Inertia::render('Admin/Videos/Index', [
            'videos' => Video::latest()->get()
        ]);
    }

    // Enregistrer une nouvelle vidéo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'youtube_id' => 'required|string|max:50|unique:videos,youtube_id',
            'category' => 'required|string|max:100',
            'duration' => 'required|integer|min:1',
        ]);

        Video::create($validated);

        return redirect()->route('admin.videos.index')->with('success', 'Vidéo ajoutée avec succès !');
    }

    // Mettre à jour une vidéo existante
    public function update(Request $request, Video $video)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'youtube_id' => 'required|string|max:50|unique:videos,youtube_id,' . $video->id,
            'category' => 'required|string|max:100',
            'duration' => 'required|integer|min:1',
        ]);

        $video->update($validated);

        return redirect()->route('admin.videos.index')->with('success', 'Vidéo modifiée avec succès !');
    }

    // Supprimer une vidéo
    public function destroy(Video $video)
    {
        $video->delete();

        return redirect()->route('admin.videos.index')->with('success', 'Vidéo supprimée avec succès !');
    }
}
