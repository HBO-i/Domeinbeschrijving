<?php

namespace Database\Seeders;

use App\Models\ArchitectureLayer;
use App\Models\ArchitectureLayerTranslation;
use App\Models\Language;
use Illuminate\Database\Seeder;

class ArchitectureLayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $values = ['Gebruikersinteractie', 'Organisatieprocessen', 'Infrastructuur', 'Software', 'Hardware-Interfacing'];
        $language = Language::where('value', 'LIKE', 'nl')->first();

        foreach($values as $value){
            $architectureLayer = ArchitectureLayer::create();
            ArchitectureLayerTranslation::create([
                'value' => $value, 
                'architecture_layer_id' => $architectureLayer->id, 
                'language_id' => $language->id
            ])->save();
        }
    }
}
