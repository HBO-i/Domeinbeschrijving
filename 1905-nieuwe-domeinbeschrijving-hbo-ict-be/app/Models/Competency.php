<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competency extends Model
{
    use HasFactory;

    public function translations()
    {
        return $this->hasMany(CompetencyTranslation::class);
    }

    public function description()
    {
        return $this->hasOne(ProfessionalSkillsDescription::class);
    }

    public function focus()
    {
        return $this->belongsTo(Focus::class);
    }
}
