<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PDFShowRequest extends FormRequest
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
            'filename' => 'sometimes|string'
        ];
    }

    public function queryParameters(){
        return [
            'filename' => [
                'description' => 'The name of the PDF to retrieve. The .pdf extension is not to be included in the filename.',
                'example' => 'HBO-i-domeinbeschrijving 2018'
            ]
        ];
    }
}
