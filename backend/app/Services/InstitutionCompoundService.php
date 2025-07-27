<?php

namespace App\Services;

use App\Actions\Institution\CreateInstitutionAction;
use App\Actions\School\CreateSchoolsAction;
use App\Actions\User\CreateUsersAction;
use App\Actions\User\AssignUsersToSchoolsAction;
use App\DTOs\Institution\CompoundInstitutionDTO;
use App\Models\Institution;
use Illuminate\Support\Facades\DB;

class InstitutionCompoundService
{
    public function __construct(
        private CreateInstitutionAction $createInstitution,
        private CreateSchoolsAction $createSchools,
        private CreateUsersAction $createUsers,
        private AssignUsersToSchoolsAction $assignUsers
    ) {}
    
    public function createCompound(CompoundInstitutionDTO $dto): Institution
    {
        return DB::transaction(function () use ($dto) {
            // Crear institución
            $institution = $this->createInstitution->execute($dto->institution);
            
            // Crear colegios
            $schools = $this->createSchools->execute($dto->schools, $institution);
            
            // Crear usuarios
            $users = $this->createUsers->execute($dto->users);
            
            // Asignar usuarios a colegios
            $this->assignUsers->execute($dto->assignments, $users, $schools);
            
            return $institution;
        });
    }
}