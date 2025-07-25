<?php

namespace Database\Factories;

use App\Models\Commune;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InstitutionFactory extends Factory
{
    public function definition(): array
    {
        $prefixes = [
            'Fundación Educacional',
            'Corporación Educacional', 
            'Instituto Educacional',
            'Centro Educativo',
            'Sociedad Educacional'
        ];
        
        $names = [
            'Los Andes', 'Santa María', 'San José', 'La Salle', 'Salesiano', 
            'Don Bosco', 'María Auxiliadora', 'San Francisco', 'Los Robles',
            'Villa María', 'Santo Tomás', 'San Pedro', 'La Esperanza',
            'Bicentenario', 'Gabriela Mistral', 'Pablo Neruda', 'Arturo Prat'
        ];
        
        return [
            'name' => fake()->randomElement($prefixes) . ' ' . fake()->randomElement($names),
            'rut' => fake()->unique()->numerify('########-#'),
            'commune_id' => Commune::inRandomOrder()->first()->id,
            'address' => fake()->streetAddress() . ', ' . fake()->city() . ', Chile',
            'phone' => '+56' . fake()->numberBetween(200000000, 999999999),
            'start_date' => fake()->dateTimeBetween('-30 years', '-1 year')->format('Y-m-d'),
            'responsible_id' => User::role('responsable')->inRandomOrder()->first()->id,
        ];
    }
}