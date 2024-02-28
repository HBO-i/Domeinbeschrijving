<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityTranslation extends Model
{
    use HasFactory;

    public function activity(){
        return $this->hasOne(Activity::class);
    }

    public function language(){
        return $this->hasOne(Language::class);
    }
}
