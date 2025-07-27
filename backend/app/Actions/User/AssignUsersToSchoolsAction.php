<?php

namespace App\Actions\User;

use App\Models\School;
use App\Models\User;
use Illuminate\Support\Collection;

class AssignUsersToSchoolsAction
{
    private array $processedAssignments = [];
    private Collection $usersByRut;
    private Collection $schoolsByRut;

    public function execute(array $assignments, Collection $users, Collection $schools): void
    {
        $this->usersByRut = $users->keyBy('rut');
        $this->schoolsByRut = $schools->keyBy('rut');

        foreach ($assignments as $userRut => $schoolRuts) {
            $user = $this->getUserByRut($userRut);

            foreach ($schoolRuts as $schoolRut) {
                $school = $this->getSchoolByRut($schoolRut);
                
                $this->validateInstitutionAssociation($user, $school);
                $this->ensureNotDuplicatedAssignment($user, $school);

                $this->assignUserToSchool($user, $school);
                $this->markAssignmentAsProcessed($user, $school);
            }
        }
    }

    private function getUserByRut(string $rut): User
    {
        $user = $this->usersByRut->get($rut);

        if (!$user) {
            throw new \DomainException("Usuario con RUT {$rut} no encontrado.");
        }

        return $user;
    }

    private function getSchoolByRut(string $rut): School
    {
        $school = $this->schoolsByRut->get($rut);

        if (!$school) {
            throw new \DomainException("Colegio con RUT {$rut} no encontrado.");
        }

        return $school;
    }

    private function validateInstitutionAssociation(User $user, School $school): void
    {
        $belongsToSameInstitution = $user->schools()
            ->where('institution_id', $school->institution_id)
            ->exists() || $user->schools()->count() === 0;

        if (!$belongsToSameInstitution) {
            throw new \DomainException(
                "El usuario {$user->rut} y el colegio {$school->rut} deben pertenecer a la misma institución."
            );
        }
    }

    private function ensureNotDuplicatedAssignment(User $user, School $school): void
    {
        $assignmentKey = "{$user->id}-{$school->id}";

        if (isset($this->processedAssignments[$assignmentKey])) {
            throw new \DomainException(
                "El usuario con RUT {$user->rut} ya fue asignado al colegio con RUT {$school->rut} en este registro."
            );
        }

        if ($school->users()->where('users.id', $user->id)->exists()) {
            throw new \DomainException(
                "El usuario con RUT {$user->rut} ya está asignado previamente al colegio con RUT {$school->rut}."
            );
        }
    }

    private function assignUserToSchool(User $user, School $school): void
    {
        $school->users()->attach($user->id, [
            'assignment_date' => now(),
            'active' => true
        ]);
    }

    private function markAssignmentAsProcessed(User $user, School $school): void
    {
        $assignmentKey = "{$user->id}-{$school->id}";
        $this->processedAssignments[$assignmentKey] = true;
    }
}
