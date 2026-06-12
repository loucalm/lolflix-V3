<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('favorites', function (Blueprint $table) {
        $table->id();
        // Clé étrangère vers la table users
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        // Clé étrangère vers la table videos (qu'on créera juste après)
        $table->foreignId('video_id')->constrained()->onDelete('cascade');
        $table->timestamps();

        // Empêche un utilisateur de mettre la même vidéo deux fois en favori
        $table->unique(['user_id', 'video_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
