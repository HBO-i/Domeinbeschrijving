<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescriptionTranslation extends Model
{
    use HasFactory;

    public function description(){
        return $this->hasOne(Description::class);
    }

    public function language(){
        return $this->belongsTo(Language::class);
    }
}
