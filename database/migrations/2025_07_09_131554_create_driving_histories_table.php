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
        Schema::create('driving_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained()->onDelete('cascade');
            $table->foreignId('vehicule_id')->constrained('vehicules')->onDelete('cascade'); // Ajout ici
            $table->enum('type', ['accident', 'infraction', 'Maintenance', 'Autre']);
            $table->text('description')->nullable();
            $table->date('date');
            $table->timestamps();
            
            // Optionnel: ajout d'un index composite si nécessaire
            $table->index(['driver_id', 'vehicule_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driving_histories');
    }
};