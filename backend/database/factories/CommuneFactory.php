<?php

namespace Database\Factories;

use App\Models\Commune;
use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommuneFactory extends Factory
{
    protected $model = Commune::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->city() . ' ' . $this->faker->randomElement(['Norte', 'Sur', 'Centro', 'Alto', 'Bajo']),
            'code' => $this->faker->unique()->numerify('#####'),
            'region_id' => Region::inRandomOrder()->first()->id ?? 1,
        ];
    }

    /**
     * Indica que la comuna pertenece a una región específica
     */
    public function forRegion(Region $region): static
    {
        return $this->state(fn (array $attributes) => [
            'region_id' => $region->id,
        ]);
    }
}