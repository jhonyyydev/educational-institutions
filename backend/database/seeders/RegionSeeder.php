<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    public function run(): void
    {
        $regions = [
            ['name' => 'Región de Arica y Parinacota', 'code' => 'XV'],
            ['name' => 'Región de Tarapacá', 'code' => 'I'],
            ['name' => 'Región de Antofagasta', 'code' => 'II'],
            ['name' => 'Región de Atacama', 'code' => 'III'],
            ['name' => 'Región de Coquimbo', 'code' => 'IV'],
            ['name' => 'Región de Valparaíso', 'code' => 'V'],
            ['name' => 'Región Metropolitana de Santiago', 'code' => 'RM'],
            ['name' => 'Región del Libertador Bernardo O\'Higgins', 'code' => 'VI'],
            ['name' => 'Región del Maule', 'code' => 'VII'],
            ['name' => 'Región del Ñuble', 'code' => 'XVI'],
            ['name' => 'Región del Biobío', 'code' => 'VIII'],
            ['name' => 'Región de La Araucanía', 'code' => 'IX'],
            ['name' => 'Región de Los Ríos', 'code' => 'XIV'],
            ['name' => 'Región de Los Lagos', 'code' => 'X'],
            ['name' => 'Región de Aysén del General Carlos Ibáñez del Campo', 'code' => 'XI'],
            ['name' => 'Región de Magallanes y de la Antártica Chilena', 'code' => 'XII'],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}