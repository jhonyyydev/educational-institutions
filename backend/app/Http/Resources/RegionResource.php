<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'communes' => $this->communes->map(function ($commune) {
                return [
                    'id' => $commune->id,
                    'name' => $commune->name,
                    'code' => $commune->code,
                ];
            }),
        ];
    }
}