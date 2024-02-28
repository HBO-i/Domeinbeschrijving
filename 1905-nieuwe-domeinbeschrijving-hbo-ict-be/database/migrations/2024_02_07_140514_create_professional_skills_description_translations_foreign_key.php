<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sql = "ALTER TABLE professional_skills_description_translations
        ADD CONSTRAINT fk_translations_professional_skills_descriptions 
        FOREIGN KEY (professional_skills_description_id) REFERENCES professional_skills_descriptions(id);";

        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
