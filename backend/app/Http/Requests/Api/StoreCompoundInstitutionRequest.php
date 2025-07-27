<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompoundInstitutionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('gestionar-instituciones');
    }

    public function rules(): array
    {
        return [
            // Institución
            'name' => 'required|string|max:255',
            'rut' => 'required|string|unique:institutions,rut',
            'commune_id' => 'required|exists:communes,id',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'start_date' => 'required|date',
            'responsible_id' => 'required|exists:users,id',
            
            // Colegios
            'schools' => 'required|array|min:1',
            'schools.*.name' => 'required|string|max:255',
            'schools.*.rut' => 'required|string|unique:schools,rut',
            'schools.*.commune_id' => 'required|exists:communes,id',
            'schools.*.address' => 'required|string',
            'schools.*.phone' => 'nullable|string|max:20',
            
            // Usuarios
            'users' => 'required|array|min:1',
            'users.*.first_name' => 'required|string|max:255',
            'users.*.last_name' => 'required|string|max:255',
            'users.*.rut' => 'required|string|unique:users,rut',
            'users.*.phone' => 'nullable|string|max:20',
            'users.*.email' => 'required|email|unique:users,email',
            'users.*.password' => 'required|string|min:8|confirmed',
            'users.*.password_confirmation' => 'required|string',
            'users.*.role' => 'nullable|exists:roles,name',
            
            // Asignaciones usuario-colegio
            'user_school_assignments' => 'required|array|min:1',
            'user_school_assignments.*.user_rut' => 'required|string',
            'user_school_assignments.*.school_rut' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            // Institución
            'name.required' => 'El nombre de la institución es requerido.',
            'rut.unique' => 'El RUT de la institución ya está registrado.',
            'commune_id.exists' => 'La comuna seleccionada no existe.',
            'responsible_id.exists' => 'El responsable seleccionado no existe.',
            
            // Colegios
            'schools.required' => 'Debe registrar al menos un colegio.',
            'schools.min' => 'Debe registrar al menos un colegio.',
            'schools.*.name.required' => 'El nombre del colegio es requerido.',
            'schools.*.rut.unique' => 'El RUT del colegio :input ya existe.',
            'schools.*.rut.required' => 'El RUT del colegio es requerido.',
            'schools.*.commune_id.exists' => 'La comuna del colegio no existe.',
            'schools.*.address.required' => 'La dirección del colegio es requerida.',
            
            // Usuarios
            'users.required' => 'Debe registrar al menos un usuario.',
            'users.min' => 'Debe registrar al menos un usuario.',
            'users.*.first_name.required' => 'El nombre del usuario es requerido.',
            'users.*.last_name.required' => 'El apellido del usuario es requerido.',
            'users.*.rut.unique' => 'El RUT del usuario :input ya existe.',
            'users.*.rut.required' => 'El RUT del usuario es requerido.',
            'users.*.email.unique' => 'El email :input ya está registrado.',
            'users.*.email.required' => 'El email es requerido.',
            'users.*.password.required' => 'La contraseña es requerida.',
            'users.*.password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'users.*.password.confirmed' => 'Las contraseñas no coinciden.',
            
            // Asignaciones
            'user_school_assignments.required' => 'Debe asignar usuarios a colegios.',
            'user_school_assignments.min' => 'Debe realizar al menos una asignación usuario-colegio.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Validar que no haya RUTs duplicados dentro del mismo request
            $schoolRuts = collect($this->input('schools', []))->pluck('rut')->filter();
            if ($schoolRuts->count() !== $schoolRuts->unique()->count()) {
                $validator->errors()->add('schools', 'Hay RUTs de colegios duplicados en el formulario.');
            }

            $userRuts = collect($this->input('users', []))->pluck('rut')->filter();
            if ($userRuts->count() !== $userRuts->unique()->count()) {
                $validator->errors()->add('users', 'Hay RUTs de usuarios duplicados en el formulario.');
            }

            // Validar que las asignaciones referencien RUTs existentes en el mismo request
            $assignments = collect($this->input('user_school_assignments', []));
            
            foreach ($assignments as $index => $assignment) {
                if (!$userRuts->contains($assignment['user_rut'] ?? null)) {
                    $validator->errors()->add(
                        "user_school_assignments.{$index}.user_rut", 
                        'El RUT del usuario debe estar en la lista de usuarios a crear.'
                    );
                }
                
                if (!$schoolRuts->contains($assignment['school_rut'] ?? null)) {
                    $validator->errors()->add(
                        "user_school_assignments.{$index}.school_rut", 
                        'El RUT del colegio debe estar en la lista de colegios a crear.'
                    );
                }
            }
        });
    }
}