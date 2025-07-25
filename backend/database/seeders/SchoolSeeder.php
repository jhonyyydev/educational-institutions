<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\Institution;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $institutions = Institution::all();
        
        // Crear 3-5 colegios por institución
        $institutions->each(function ($institution) {
            $schoolCount = rand(3, 5);
            School::factory($schoolCount)->create([
                'institution_id' => $institution->id,
                'commune_id' => $institution->commune_id,
            ]);
        });
    }
}