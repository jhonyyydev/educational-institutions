<?php

namespace App\Repositories\Contracts;

use App\DTOs\School\CreateSchoolDTO;
use App\Models\School;
use App\Models\Institution;

interface SchoolRepositoryInterface
{
    public function create(CreateSchoolDTO $dto, Institution $institution): School;
    public function findByRut(string $rut): ?School;
}