<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolUserSeeder extends Seeder
{
    public function run(): void
    {
        $docentes = User::role('docente')->get();
        $administrativos = User::role('administrativo')->get();
        $schools = School::all();

        $docentes->each(function ($docente) use ($schools) {
            $assignedSchools = $schools->random(rand(1, 3));
            
            foreach ($assignedSchools as $school) {
                $docente->schools()->attach($school->id, [
                    'assignment_date' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
                    'unassignment_date' => null,
                    'active' => true,
                ]);
            }
        });

        $administrativos->each(function ($administrativo) use ($schools) {
            $school = $schools->random();
            
            $administrativo->schools()->attach($school->id, [
                'assignment_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
                'unassignment_date' => null,
                'active' => true,
            ]);
        });
    }
}