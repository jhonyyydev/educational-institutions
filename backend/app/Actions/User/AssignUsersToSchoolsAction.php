<?php

namespace App\Actions\User;

use App\Models\School;
use App\Models\User;
use Illuminate\Support\Collection;

class AssignUsersToSchoolsAction
{
    public function execute(array $assignments, Collection $users, Collection $schools): void
    {
        $usersByRut = $users->keyBy('rut');
        $schoolsByRut = $schools->keyBy('rut');
        
        foreach ($assignments as $userRut => $schoolRuts) {
            $user = $usersByRut->get($userRut);
            
            if (!$user) {
                throw new \DomainException("Usuario con RUT {$userRut} no encontrado.");
            }
            
            foreach ($schoolRuts as $schoolRut) {
                $school = $schoolsByRut->get($schoolRut);
                
                if (!$school) {
                    throw new \DomainException("Colegio con RUT {$schoolRut} no encontrado.");
                }
                
                if (!$this->belongToSameInstitution($user, $school)) {
                    throw new \DomainException(
                        "El usuario y el colegio deben pertenecer a la misma institución."
                    );
                }
                
                $school->users()->attach($user->id, [
                    'assignment_date' => now(),
                    'active' => true
                ]);
            }
        }
    }
    
    private function belongToSameInstitution(User $user, School $school): bool
    {
        return $user->schools()
            ->where('institution_id', $school->institution_id)
            ->exists() || $user->schools()->count() === 0;
    }
}