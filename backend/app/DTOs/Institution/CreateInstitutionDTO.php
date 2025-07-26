<?php

namespace App\DTOs\Institution;

class CreateInstitutionDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $rut,
        public readonly int $communeId,
        public readonly string $address,
        public readonly ?string $phone,
        public readonly string $startDate,
        public readonly int $responsibleId
    ) {}
    
    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            rut: $data['rut'],
            communeId: $data['commune_id'],
            address: $data['address'],
            phone: $data['phone'] ?? null,
            startDate: $data['start_date'],
            responsibleId: $data['responsible_id']
        );
    }
}