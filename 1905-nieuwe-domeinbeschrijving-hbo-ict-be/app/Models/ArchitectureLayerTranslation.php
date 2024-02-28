<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchitectureLayerTranslation extends Model
{
    use HasFactory;

    public function architectureLayer(){
        return $this->hasOne(ArchitectureLayer::class);
    }

    public function language(){
        return $this->hasOne(Language::class);
    }
}
