<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreInstitutionRequest;
use App\Http\Requests\Api\StoreCompoundInstitutionRequest;
use App\Http\Resources\InstitutionResource;
use App\Http\Resources\InstitutionCollection;
use App\Services\InstitutionCompoundService;
use App\DTOs\Institution\CompoundInstitutionDTO;
use App\Models\Institution;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    protected $institutionCompoundService;

    public function __construct(InstitutionCompoundService $institutionCompoundService)
    {
        $this->institutionCompoundService = $institutionCompoundService;
    }

    public function index(Request $request)
    {
        $institutions = Institution::with(['commune.region', 'responsible', 'schools'])
            ->paginate(10);

        return InstitutionResource::collection($institutions);
    }


    // Registro compuesto (institución + colegios + usuarios)
    public function store(StoreCompoundInstitutionRequest $request)
    {
        try {
            $dto = CompoundInstitutionDTO::fromRequest($request->validated());
            $institution = $this->institutionCompoundService->createCompound($dto);
            
            return response()->json([
                'message' => 'Institución creada exitosamente',
                'data' => new InstitutionResource($institution->load(['schools.users', 'responsible']))
            ], 201);
            
        } catch (\DomainException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 422);
        }
    }

    // Registro simple (solo institución)
    public function storeSimple(StoreInstitutionRequest $request)
    {
        try {
            $institution = Institution::create($request->validated());
            
            $institution->load(['commune.region', 'responsible']);
            
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
}