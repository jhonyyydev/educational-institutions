<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreInstitutionRequest;
use App\Http\Resources\InstitutionResource;
use App\Http\Resources\InstitutionCollection;
use App\Models\Institution;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $institutions = Institution::with(['commune.region', 'responsible', 'schools'])
            ->paginate(10);

        return new InstitutionCollection($institutions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInstitutionRequest $request)
    {
        try {
            $institution = Institution::create($request->validated());
            
            $institution->load(['commune.region', 'responsible', 'schools']);
            
            return response()->json([
                'message' => 'Institución creada exitosamente',
                'data' => new InstitutionResource($institution)
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la institución',
                'error' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
