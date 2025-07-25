<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'region_id',
    ];

    protected function casts(): array
    {
        return [
            'region_id' => 'integer',
        ];
    }

    // Relaciones
    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function institutions()
    {
        return $this->hasMany(Institution::class);
    }

    public function schools()
    {
        return $this->hasMany(School::class);
    }
}