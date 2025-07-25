<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
    ];

    // Relaciones
    public function communes()
    {
        return $this->hasMany(Commune::class);
    }

    public function institutions()
    {
        return $this->hasManyThrough(Institution::class, Commune::class);
    }

    public function schools()
    {
        return $this->hasManyThrough(School::class, Commune::class);
    }
}