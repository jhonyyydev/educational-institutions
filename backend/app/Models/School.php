<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'rut',
        'commune_id',
        'address',
        'phone',
        'institution_id',
    ];

    protected function casts(): array
    {
        return [
            'commune_id' => 'integer',
            'institution_id' => 'integer',
        ];
    }

    // Relaciones
    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'school_user', 'school_id', 'user_id')
                    ->withPivot(['assignment_date', 'unassignment_date', 'active'])
                    ->withTimestamps();
    }

    public function activeUsers()
    {
        return $this->users()->wherePivot('active', true);
    }

    // Accessors
    public function getRegionAttribute()
    {
        return $this->commune->region;
    }

    public function getResponsibleAttribute()
    {
        return $this->institution->responsible;
    }

    // Scopes
    public function scopeByInstitution($query, $institutionId)
    {
        return $query->where('institution_id', $institutionId);
    }

    public function scopeByCommune($query, $communeId)
    {
        return $query->where('commune_id', $communeId);
    }
}