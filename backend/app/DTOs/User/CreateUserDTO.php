<?php

namespace App\DTOs\User;

class CreateUserDTO
{
    public function __construct(
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $rut,
        public readonly ?string $phone,
        public readonly string $email,
        public readonly string $password,
        public readonly ?string $role
    ) {}
    
    public static function fromArray(array $data): self
    {
        return new self(
            firstName: $data['first_name'],
            lastName: $data['last_name'],
            rut: $data['rut'],
            phone: $data['phone'] ?? null,
            email: $data['email'],
            password: $data['password'],
            role: $data['role'] ?? null
        );
    }
}