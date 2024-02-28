<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessionalSkillsDescriptionTranslation extends Model
{
    use HasFactory;

    public function description()
    {
        return $this->belongsTo(ProfessionalSkillsDescription::class);
    }
}
