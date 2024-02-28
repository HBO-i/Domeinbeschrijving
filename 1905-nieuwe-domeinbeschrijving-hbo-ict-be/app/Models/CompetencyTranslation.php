<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetencyTranslation extends Model
{
    use HasFactory;

    public function competency()
    {
        return $this->belongsTo(Competency::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
