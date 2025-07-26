<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\SchoolRepositoryInterface;
use App\DTOs\School\CreateSchoolDTO;
use App\Models\School;
use App\Models\Institution;

class SchoolRepository implements SchoolRepositoryInterface
{
    public function create(CreateSchoolDTO $dto, Institution $institution): School
    {
        return School::create([
            'name' => $dto->name,
            'rut' => $dto->rut,
            'commune_id' => $dto->communeId,
            'address' => $dto->address,
            'phone' => $dto->phone,
            'institution_id' => $institution->id,
        ]);
    }
    
    public function findByRut(string $rut): ?School
    {
        return School::where('rut', $rut)->first();
    }
}