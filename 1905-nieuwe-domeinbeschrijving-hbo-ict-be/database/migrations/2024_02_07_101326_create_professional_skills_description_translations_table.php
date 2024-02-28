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
        Schema::create('professional_skills_description_translations', function (Blueprint $table) {
            $table->id();
            $table->text('value');
            $table->unsignedBigInteger('professional_skills_description_id');
            $table->foreignId('language_id')->references('id')->on('languages');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professional_skills_description_translations');
    }
};
