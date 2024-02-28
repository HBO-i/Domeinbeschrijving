<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    use HasFactory;

    public function architectureLayer(){
        return $this->belongsTo(ArchitectureLayer::class);
    }

    public function activity(){
        return $this->belongsTo(Activity::class);
    }

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function descriptionTranslation(){
        return $this->belongsTo(DescriptionTranslation::class);
    }
}
