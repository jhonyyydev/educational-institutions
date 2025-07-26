<?php

namespace App\Repositories\Contracts;

use App\DTOs\User\CreateUserDTO;
use App\Models\User;

interface UserRepositoryInterface
{
    public function create(CreateUserDTO $dto): User;
    public function findByRut(string $rut): ?User;
}