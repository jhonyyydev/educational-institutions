<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolUser extends Model
{
    use HasFactory;

    protected $table = 'school_user';
    protected $primaryKey = 'school_user_id';

    protected $fillable = [
        'user_id',
        'school_id',
        'assignment_date',
        'unassignment_date',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'assignment_date' => 'date',
            'unassignment_date' => 'date',
            'active' => 'boolean',
            'user_id' => 'integer',
            'school_id' => 'integer',
        ];
    }

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('active', false);
    }

    public function scopeCurrentAssignments($query)
    {
        return $query->where('active', true)
                    ->whereNull('unassignment_date');
    }

    public function deactivate()
    {
        $this->update([
            'active' => false,
            'unassignment_date' => now()->toDateString(),
        ]);
    }

    public function activate()
    {
        $this->update([
            'active' => true,
            'unassignment_date' => null,
        ]);
    }
}