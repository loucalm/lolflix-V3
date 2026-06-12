<?php

namespace Database\Seeders;

use App\Models\Video;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        Video::create([
            'title' => 'Mon incroyable Vlog en Italie',
            'description' => 'Découvrez les coulisses de mon voyage, monté de toutes pièces style rétro.',
            'youtube_id' => 'dQw4w9WgXcQ', // Remplace par ton ID de vidéo YouTube
            'category' => 'Vlogs',
            'duration' => 620
        ]);

        Video::create([
            'title' => 'Court-métrage Fiction Parodie',
            'description' => 'Un projet de parodie totalement délirant réalisé avec les potes.',
            'youtube_id' => 'kJQP7kiw5Fk',
            'category' => 'Films',
            'duration' => 1200
        ]);
    }
}
