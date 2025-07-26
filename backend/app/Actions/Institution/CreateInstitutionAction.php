<?php

namespace App\Actions\Institution;

use App\DTOs\Institution\CreateInstitutionDTO;
use App\Models\Institution;
use App\Repositories\Contracts\InstitutionRepositoryInterface;

class CreateInstitutionAction
{
    public function __construct(
        private InstitutionRepositoryInterface $institutionRepository
    ) {}
    
    public function execute(CreateInstitutionDTO $dto): Institution
    {
        if ($this->institutionRepository->findByRut($dto->rut)) {
            throw new \DomainException("La institución con RUT {$dto->rut} ya existe.");
        }
        
        return $this->institutionRepository->create($dto);
    }
}