<?php

namespace App\Repositories\Contracts;

use App\DTOs\Institution\CreateInstitutionDTO;
use App\Models\Institution;

interface InstitutionRepositoryInterface
{
    public function create(CreateInstitutionDTO $dto): Institution;
    public function findByRut(string $rut): ?Institution;
}