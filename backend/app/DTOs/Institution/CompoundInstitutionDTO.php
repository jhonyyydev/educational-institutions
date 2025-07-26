<?php

namespace App\DTOs\Institution;

use App\DTOs\School\CreateSchoolDTO;
use App\DTOs\User\CreateUserDTO;

class CompoundInstitutionDTO
{
    public function __construct(
        public readonly CreateInstitutionDTO $institution,
        public readonly array $schools,
        public readonly array $users,
        public readonly array $assignments // array of user_rut => school_ruts[]
    ) {}
    
    public static function fromRequest(array $validated): self
    {
        return new self(
            institution: CreateInstitutionDTO::fromArray($validated),
            schools: array_map(fn($school) => CreateSchoolDTO::fromArray($school), $validated['schools']),
            users: array_map(fn($user) => CreateUserDTO::fromArray($user), $validated['users']),
            assignments: self::parseAssignments($validated['user_school_assignments'])
        );
    }
    
    private static function parseAssignments(array $assignments): array
    {
        $parsed = [];
        foreach ($assignments as $assignment) {
            $parsed[$assignment['user_rut']][] = $assignment['school_rut'];
        }
        return $parsed;
    }
}