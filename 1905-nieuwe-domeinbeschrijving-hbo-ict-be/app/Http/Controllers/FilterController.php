<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterIndexRequest;
use App\Http\Resources\FilterResource;
use App\Models\Language;
use App\Models\Level;
use Illuminate\Support\Facades\DB;

class FilterController extends Controller
{
    public function index(FilterIndexRequest $request){
        $validated = $request->validated();

        $language = isset($validated['language']) ? $validated['language'] : Language::where('value', 'LIKE', 'nl')->first()->id;

        $levels = Level::select('id', 'value')->get();
        $activities = DB::table('activity_translations')->select('activity_id as id', 'value')->where('language_id', '=', $language)->get();
        $architectureLayers = DB::table('architecture_layer_translations')->select('architecture_layer_id as id', 'value')->where('language_id', '=', $language)->get();
        
        return new FilterResource($levels, $activities, $architectureLayers);
    }
}
