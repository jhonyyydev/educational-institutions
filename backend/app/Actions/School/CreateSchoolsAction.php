<?php

namespace App\Actions\School;

use App\DTOs\School\CreateSchoolDTO;
use App\Models\Institution;
use App\Repositories\Contracts\SchoolRepositoryInterface;
use Illuminate\Support\Collection;

class CreateSchoolsAction
{
    public function __construct(
        private SchoolRepositoryInterface $schoolRepository
    ) {}
    
    public function execute(array $schoolDTOs, Institution $institution): Collection
    {
        $schools = collect();
        
        foreach ($schoolDTOs as $dto) {
            $existingSchool = $this->schoolRepository->findByRut($dto->rut);
            
            if ($existingSchool) {
                throw new \DomainException(
                    "El colegio con RUT {$dto->rut} ya está adscrito a otra institución."
                );
            }
            
            $schools->push($this->schoolRepository->create($dto, $institution));
        }
        
        return $schools;
    }
}