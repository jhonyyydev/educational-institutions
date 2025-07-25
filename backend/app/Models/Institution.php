<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'rut',
        'commune_id',
        'address',
        'phone',
        'start_date',
        'responsible_id',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'commune_id' => 'integer',
            'responsible_id' => 'integer',
        ];
    }

    // Relaciones
    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }

    public function responsible()
    {
        return $this->belongsTo(User::class, 'responsible_id');
    }

    public function schools()
    {
        return $this->hasMany(School::class);
    }

    public function users()
    {
        return $this->hasManyThrough(
            User::class,
            School::class,
            'institution_id', 
            'id',             
            'id',             
            'id'              
        )->distinct();
    }

    // Accessors
    public function getRegionAttribute()
    {
        return $this->commune->region;
    }

    // Scopes
    public function scopeByResponsible($query, $userId)
    {
        return $query->where('responsible_id', $userId);
    }
}