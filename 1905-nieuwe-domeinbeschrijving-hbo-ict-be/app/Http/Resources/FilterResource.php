<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilterResource extends JsonResource
{
    private $levels;
    private $activities;
    private $architectureLayers;

    public function __construct($levels, $activities, $architectureLayers)
    {
        $this->levels = $levels;
        $this->activities = $activities;
        $this->architectureLayers = $architectureLayers;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'levels' => LabelResource::collection($this->levels),
            'activities' => LabelResource::collection($this->activities),
            'architecture_layers' => LabelResource::collection($this->architectureLayers)
        ];
    }
}
