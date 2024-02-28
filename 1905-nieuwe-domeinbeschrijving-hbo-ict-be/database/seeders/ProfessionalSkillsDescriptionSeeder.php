<?php

namespace Database\Seeders;

use App\Models\Competency;
use App\Models\CompetencyTranslation;
use App\Models\Focus;
use App\Models\FocusTranslation;
use App\Models\Language;
use App\Models\ProfessionalSkillsDescription;
use App\Models\ProfessionalSkillsDescriptionTranslation;
use Illuminate\Database\Seeder;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

class ProfessionalSkillsDescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reader = new Xlsx();
        $spreadsheet = $reader->load(DatabaseSeeder::get_excel_path());

        $sheetNames = array_filter($spreadsheet->getSheetNames(), function ($v) {
            return $v === 'profskills';
        });

        if (count($sheetNames) > 0){
            $sheetName = reset($sheetNames);
            
            $workSheet = $spreadsheet->getSheetByName($sheetName);

            $language = Language::where('value', 'LIKE', 'nl')->first();
            
            $seperatorColor = 'C00000';
            $currentRowIndex = 3;
            $focusColumn = 'A';
            $competencyColumn = 'B';
            $descriptionColumn = 'C';

            $focuses = collect();

            $endRow = null;

            while($endRow === null){
                $currentCell = $workSheet->getCell($focusColumn.$currentRowIndex);

                if ($currentCell->getStyle()->getFill()->getStartColor()->getRGB() === $seperatorColor) {
                    $currentRowIndex++;
                    continue;
                }

                if ($currentCell->getStyle()->getFill()->getStartColor()->getRGB() === 'FFFFFF') {
                    $endRow = $currentRowIndex;
                    continue;
                }
                
                $focus = null;
                $competency = null;

                $cellValue = $this->getCellValue($currentCell);

                if ($cellValue === null || $cellValue === '' || ctype_space($cellValue)){
                    $focus = $focuses->last();
                } else {
                    $focus = Focus::create();
                    $focuses->add($focus);

                    FocusTranslation::create([
                        'value' => $cellValue,
                        'focus_id' => $focus->id,
                        'language_id' => $language->id
                    ]);
                }

                $currentCell = $workSheet->getCell($competencyColumn.$currentRowIndex);
                $cellValue = $this->getCellValue($currentCell);

                $competency = Competency::create([
                    'focus_id' => $focus->id
                ]);
                CompetencyTranslation::create([
                    'value' => $cellValue,
                    'competency_id' => $competency->id,
                    'language_id' => $language->id
                ]);

                $currentCell = $workSheet->getCell($descriptionColumn.$currentRowIndex);
                $cellValue = $this->getCellValue($currentCell);

                $description = ProfessionalSkillsDescription::create([
                    'competency_id'=> $competency->id
                ]);
                ProfessionalSkillsDescriptionTranslation::create([
                    'value' => $cellValue,
                    'professional_skills_description_id' => $description->id,
                    'language_id' => $language->id
                ]);

                $currentRowIndex++;
            }
        }
    }

    private function getCellValue(Cell $cell) : ?string
    {
        return gettype($cell->getValue()) == 'string' || $cell->getValue() === null
            ? $cell->getValue() 
            : $cell->getValue()->getPlainText();
    }
}
