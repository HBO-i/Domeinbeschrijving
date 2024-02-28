<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FocusTranslation extends Model
{
    use HasFactory;

    public function focus()
    {
        return $this->belongsTo(Focus::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
