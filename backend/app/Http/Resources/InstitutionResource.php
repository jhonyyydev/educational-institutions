<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstitutionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'rut' => $this->rut,
            'address' => $this->address,
            'phone' => $this->phone,
            'start_date' => $this->start_date->format('Y-m-d'),
            'commune' => [
                'id' => $this->commune->id,
                'name' => $this->commune->name,
            ],
            'region' => [
                'id' => $this->region->id,
                'name' => $this->region->name,
            ],
            'responsible' => [
                'id' => $this->responsible->id,
                'full_name' => $this->responsible->full_name,
                'email' => $this->responsible->email,
            ],
            'schools_count' => $this->whenCounted('schools'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}