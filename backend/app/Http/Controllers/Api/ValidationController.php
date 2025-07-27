<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ValidateRutRequest;
use App\Models\School;
use App\Models\User;

class ValidationController extends Controller
{
    public function validateSchoolRut(ValidateRutRequest $request)
    {
        $school = School::where('rut', $request->rut)->first();
        
        if ($school) {
            return response()->json([
                'valid' => false,
                'message' => "El colegio con RUT {$request->rut} ya está adscrito a otra institución.",
                'institution_name' => $school->institution->name
            ], 200);
        }
        
        return response()->json(['valid' => true], 200);
    }

    public function validateUserRut(ValidateRutRequest $request)
    {
        $user = User::where('rut', $request->rut)->first();
        
        if ($user && $user->institutions->count() > 0) {
            return response()->json([
                'valid' => false,
                'message' => "El usuario con RUT {$request->rut} ya pertenece a otra institución.",
                'institution_names' => $user->institutions->pluck('name')
            ], 200);
        }
        
        return response()->json(['valid' => true], 200);
    }
}