<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public static function get_excel_path(): string
    {
        return storage_path('app/public/excel/DB23_kubus_NL.xlsx');
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LanguageSeeder::class,
            ArchitectureLayerSeeder::class,
            ActivitySeeder::class,
            LevelSeeder::class,
            DescriptionSeeder::class,
            ProfessionalSkillsDescriptionSeeder::class
        ]);
    }
}
