<?php

namespace Database\Factories;

use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;

class SchoolFactory extends Factory
{
    public function definition(): array
    {
        $types = ['Colegio', 'Liceo', 'Escuela', 'Instituto'];
        $names = [
            'San Pedro', 'Santa Ana', 'Los Robles', 'La Esperanza', 
            'Bicentenario', 'Gabriela Mistral', 'Pablo Neruda', 'Arturo Prat',
            'O\'Higgins', 'San Martín', 'Simón Bolívar', 'José Miguel Carrera',
            'Manuel Rodríguez', 'Violeta Parra', 'Víctor Jara', 'Los Arrayanes'
        ];
        
        $institution = Institution::inRandomOrder()->first();
        
        return [
            'name' => fake()->randomElement($types) . ' ' . fake()->randomElement($names),
            'rut' => fake()->unique()->numerify('########-#'),
            'commune_id' => $institution->commune_id, // Misma comuna que la institución
            'address' => fake()->streetAddress() . ', ' . fake()->city() . ', Chile',
            'phone' => '+56' . fake()->numberBetween(200000000, 999999999),
            'institution_id' => $institution->id,
        ];
    }
}