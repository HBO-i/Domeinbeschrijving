<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityTranslation;
use App\Models\ArchitectureLayer;
use App\Models\ArchitectureLayerTranslation;
use App\Models\Description;
use App\Models\DescriptionTranslation;
use App\Models\Language;
use App\Models\Level;
use Illuminate\Database\Seeder;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

class DescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reader = new Xlsx();
        $spreadsheet = $reader->load(DatabaseSeeder::get_excel_path());

        // Ignore Professional Skills sheet. Sheet names correspond to the Architecture Level.
        $sheetNames = array_filter($spreadsheet->getSheetNames(), function($v) {
            return $v !== 'profskills';
        });

        // These are used to limit the amount of database calls. Sheetnames are lowercase, and 
        // thus the values of the architecture layers and activities temporarily need to be
        // lowercase aswell.
        $language = Language::where('value', 'LIKE', 'nl')->first();
        $architectureLayers = ArchitectureLayerTranslation::where('language_id', '=', $language->id)->get()->transform(function ($item) {
            $item->value = strtolower($item->value);
            return $item;
        });
        $activities = ActivityTranslation::where('language_id', '=', $language->id)->get()->transform(function ($item) {
            $item->value = strtolower($item->value);
            return $item;
        });
        $levels = Level::get();

        foreach($sheetNames as $sheetName){
            $workSheet = $spreadsheet->getSheetByName($sheetName);

            // Levels are defined in cells C2, E3, G2 and I2
            $descriptionColumns = ['C', 'E', 'G', 'I'];

            // Activities are defined in column 2.
            $activitiesColumn = 'B';

            // These are used for making sure that the correct activity is set when creating the description.
            $activityRows = [];
            $previousActivity = null;

            // Find row at which no more activities are defined, meaning that it is the end of the table.
            $endRow = null;
            $currentRowIndex = 3;

            $dividerRows = [];

            // Find the end of the table, and make note of the activities and divider rows whilst you're at it.
            while($endRow == null){
                $currentCellName = $activitiesColumn.$currentRowIndex;
                $currentCell = $workSheet->getCell($currentCellName);

                // Activities have a fill of #E7E6E6, and 'divider' cells have a fill of #C00000, 
                // meaning that a cell with a fill of #FFFFFF marks the end of the table.
                if ($currentCell->getStyle()->getFill()->getStartColor()->getRGB() == 'FFFFFF'){
                    $endRow = $currentRowIndex;
                    break;
                }

                // Check if cell is a dividing row or not.
                if ($currentCell->getStyle()->getFill()->getStartColor()->getRGB() == 'C00000') {
                    $dividerRows[] = $currentRowIndex;
                } else {
                    // Activities can include multiple descriptions, which means that an activity spans multiple rows.
                    if ($currentCell->getValue() != null){
                        // Set previousActivity since the activity is only defined once.
                        $previousActivity = gettype($currentCell->getValue()) == 'string' 
                            ? $currentCell->getValue() 
                            : $currentCell->getValue()->getPlainText(); // Some cells contain Rich Text instead of plain text
                    } 
                    
                    // Current row is used as index instead of 'normal' indexing so that finding the related activity is easier.
                    $activityRows[$currentRowIndex] = $previousActivity;
                }

                $currentRowIndex++;
            }

            // Finally, get the descriptions from the table.
            foreach($descriptionColumns as $key => $value){
                // Descriptions start at row 3.
                for($i = 3; $i < $endRow; $i++){
                    // Skip divider row cell.
                    if (in_array($i, $dividerRows)) {
                        continue;
                    }

                    $currentCellName = $value.$i;
                    $currentCell = $workSheet->getCell($currentCellName);

                    // Ignore empty description cells aswell.
                    if (empty($currentCell->getValue())){
                        continue;
                    }
                    
                    $description = Description::create([
                        'architecture_layer_id' => $architectureLayers->where('value', $sheetName)->first()->id,
                        'level_id' => $levels->where('value', ''.$key + 1)->first()->id,
                        'activity_id' => $activities->where('value', strtolower($activityRows[$i]))->first()->id
                    ]);

                    DescriptionTranslation::create([
                        'value' => $currentCell->getValue(),
                        'language_id' => $language->id,
                        'description_id' => $description->id
                    ]);
                }
            }
        }
    }
}
