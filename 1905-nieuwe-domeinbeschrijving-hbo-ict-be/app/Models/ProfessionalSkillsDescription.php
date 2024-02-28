<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessionalSkillsDescription extends Model
{
    use HasFactory;

    public function translations()
    {
        return $this->hasMany(ProfessionalSkillsDescriptionTranslation::class);
    }

    public function description()
    {
        return $this->belongsTo(ProfessionalSkillsDescription::class);
    }
}
