<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreInstitutionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('gestionar-instituciones');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'rut' => 'required|string|unique:institutions,rut',
            'commune_id' => 'required|exists:communes,id',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'start_date' => 'required|date',
            'responsible_id' => 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'rut.unique' => 'El RUT ya está registrado.',
            'commune_id.exists' => 'La comuna seleccionada no existe.',
            'responsible_id.exists' => 'El responsable seleccionado no existe.',
        ];
    }
}