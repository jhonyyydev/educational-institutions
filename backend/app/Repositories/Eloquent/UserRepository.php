<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\DTOs\User\CreateUserDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function create(CreateUserDTO $dto): User
    {
        return User::create([
            'first_name' => $dto->firstName,
            'last_name' => $dto->lastName,
            'rut' => $dto->rut,
            'phone' => $dto->phone,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
        ]);
    }
    
    public function findByRut(string $rut): ?User
    {
        return User::where('rut', $rut)->first();
    }
}