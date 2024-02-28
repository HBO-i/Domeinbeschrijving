<?php

namespace App\Http\Requests;

use App\Rules\DescriptionGrouping;
use Illuminate\Foundation\Http\FormRequest;

class IndexDescriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'search' => 'nullable|string',
            'grouping' => ['nullable', 'string', new DescriptionGrouping],
            'language' => 'nullable|integer|exists:languages,id',
            'level' => 'nullable|array',
            'level.*' => 'integer|exists:levels,id',
            'activity' => 'nullable|array',
            'activity.*' => 'integer|exists:activities,id',
            'architecture_layer' => 'nullable|array',
            'architecture_layer.*' => 'integer|exists:architecture_layers,id'
        ];
    }

    public function queryParameters(){
        return [
            'search' => [
                'description' => 'The search term.',
                'example' => '',
            ],
            'grouping' => [
                'description' => 'A comma seperated order of the grouping. The order must and can only contain the following items: levels, activities, architecture_layers',
                'example' => 'architecture_layers,activities,levels'
            ],
            'language' => [
                'description' => 'The id of the selected language. Defaults to Dutch.',
                'example' => 1,
            ],
            'level' => [
                'description' => 'Array of the selected levels.'
            ],
            'level.*' => [
                'description' => 'Id of the level.',
                'example' => 1,
            ],
            'activity' => [
                'description' => 'Array of the selected levels.'
            ],
            'activity.*' => [
                'description' => 'Id of the activity.',
                'example' => 3,
            ],
            'architecture_layer' => [
                'description' => 'Array of the selected architecture layers.'
            ],
            'architecture_layer.*' => [
                'description' => 'Id of the architecture layer.',
                'example' => 2,
            ],
        ];
    }
}
