<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Focus extends Model
{
    use HasFactory;

    public function translations()
    {
        return $this->hasMany(FocusTranslation::class);
    }

    public function competencies()
    {
        return $this->hasMany(Competency::class);
    }
}
