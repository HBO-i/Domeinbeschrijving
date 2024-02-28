<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = ['value'];

    public function description()
    {
        return $this->hasMany(Description::class);
    }

    public function translation()
    {
        return $this->hasOne(ActivityTranslation::class);
    }
}
