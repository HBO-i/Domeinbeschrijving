<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfessionalSkillsIndexRequest extends FormRequest
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
            'language' => 'sometimes|integer|exists:languages,id'
        ];
    }

    public function queryParameters()
    {
        return [
            'language' => [
                'description' => 'The id of the language to use.',
                'example' => 1
            ]
        ];
    }
}
