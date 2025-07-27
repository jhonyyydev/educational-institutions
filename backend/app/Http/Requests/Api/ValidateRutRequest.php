<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ValidateRutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cualquier usuario autenticado puede validar
    }

    public function rules(): array
    {
        return [
            'rut' => 'required|string|max:12|regex:/^[0-9]{7,8}-[0-9Kk]$/'
        ];
    }

    public function messages(): array
    {
        return [
            'rut.required' => 'El RUT es requerido para validar.',
            'rut.max' => 'El RUT no puede exceder 12 caracteres.',
            'rut.regex' => 'El formato del RUT no es válido. Debe ser como: 12345678-9 o 12345678-K'
        ];
    }

    protected function prepareForValidation()
    {
        // Normalizar el RUT, remover puntos y convertir K a mayúscula
        if ($this->has('rut')) {
            $this->merge([
                'rut' => strtoupper(str_replace('.', '', $this->rut))
            ]);
        }
    }
}