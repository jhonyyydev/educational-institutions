<?php

namespace Database\Seeders;

use App\Models\Region;
use App\Models\Commune;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,          
            RegionSeeder::class,      
        ]);

        $regions = Region::all();
        foreach ($regions as $region) {
            // Generar entre 5 y 10 comunas por región
            $communeCount = rand(5, 10);
            
            Commune::factory()
                ->count($communeCount)
                ->forRegion($region)
                ->create();
        }

        $this->call([
            UserSeeder::class,
            InstitutionSeeder::class,
            SchoolSeeder::class,
            SchoolUserSeeder::class,
        ]);
    }
}