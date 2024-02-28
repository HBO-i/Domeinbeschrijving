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
        Schema::create('architecture_layer_translations', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            $table->foreignId('architecture_layer_id')->references('id')->on('architecture_layers');
            $table->foreignId('language_id')->references('id')->on('languages');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('architecture_layer_translations');
    }
};
