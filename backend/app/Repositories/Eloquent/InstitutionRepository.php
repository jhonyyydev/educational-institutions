<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\InstitutionRepositoryInterface;
use App\DTOs\Institution\CreateInstitutionDTO;
use App\Models\Institution;

class InstitutionRepository implements InstitutionRepositoryInterface
{
    public function create(CreateInstitutionDTO $dto): Institution
    {
        return Institution::create([
            'name' => $dto->name,
            'rut' => $dto->rut,
            'commune_id' => $dto->communeId,
            'address' => $dto->address,
            'phone' => $dto->phone,
            'start_date' => $dto->startDate,
            'responsible_id' => $dto->responsibleId,
        ]);
    }
    
    public function findByRut(string $rut): ?Institution
    {
        return Institution::where('rut', $rut)->first();
    }
}