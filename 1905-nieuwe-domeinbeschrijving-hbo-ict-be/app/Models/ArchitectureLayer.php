<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchitectureLayer extends Model
{
    use HasFactory;

    protected $fillable = ['value'];

    public function descriptions(){
        return $this->hasMany(Description::class);
    }

    public function translation()
    {
        return $this->hasOne(ArchitectureLayerTranslation::class);
    }
}
