<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            RegionSeeder::class,
            CommuneSeeder::class,
            UserSeeder::class,
            InstitutionSeeder::class,
            SchoolSeeder::class,
            SchoolUserSeeder::class,
        ]);
    }
}