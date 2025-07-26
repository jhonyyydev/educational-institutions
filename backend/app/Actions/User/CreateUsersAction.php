<?php

namespace App\Actions\User;

use App\DTOs\User\CreateUserDTO;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;

class CreateUsersAction
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}
    
    public function execute(array $userDTOs): Collection
    {
        $users = collect();
        
        foreach ($userDTOs as $dto) {
            $existingUser = $this->userRepository->findByRut($dto->rut);
            
            if ($existingUser && $existingUser->institutions()->exists()) {
                throw new \DomainException(
                    "El usuario con RUT {$dto->rut} ya pertenece a otra institución."
                );
            }
            
            $user = $this->userRepository->create($dto);
            
            // Asignar rol: si viene especificado usarlo, sino asignar 'docente' por defecto
            $roleToAssign = $dto->role ?? 'docente';
            $user->assignRole($roleToAssign);
            
            $users->push($user);
        }
        
        return $users;
    }
}