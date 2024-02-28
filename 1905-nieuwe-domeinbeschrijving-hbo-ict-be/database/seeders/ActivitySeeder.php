<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityTranslation;
use App\Models\Language;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $values = ['Analyseren', 'Adviseren', 'Ontwerpen', 'Realiseren', 'Manage & Control'];
        $language = Language::where('value', 'LIKE', 'nl')->first();

        foreach($values as $value){
            $activity = Activity::create();
            ActivityTranslation::create([
                'value' => $value, 
                'activity_id' => $activity->id,
                'language_id' => $language->id
            ])->save();
        }
    }
}
