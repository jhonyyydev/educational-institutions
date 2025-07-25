<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Crear responsables específicos
        $responsables = [
            [
                'first_name' => 'Pedro',
                'last_name' => 'González Martínez',
                'rut' => '12345678-9',
                'phone' => '+56912345678',
                'email' => 'pedro.gonzalez@educacion.cl',
                'password' => Hash::make('password123'),
            ],
            [
                'first_name' => 'María',
                'last_name' => 'Rodríguez Silva',
                'rut' => '98765432-1',
                'phone' => '+56987654321',
                'email' => 'maria.rodriguez@educacion.cl',
                'password' => Hash::make('password123'),
            ],
            [
                'first_name' => 'Carlos',
                'last_name' => 'Muñoz Fernández',
                'rut' => '11223344-5',
                'phone' => '+56911223344',
                'email' => 'carlos.munoz@educacion.cl',
                'password' => Hash::make('password123'),
            ],
        ];

        foreach ($responsables as $userData) {
            $user = User::create($userData);
            $user->assignRole('responsable');
        }

        // Crear docentes usando factory
        $docentes = User::factory(100)->create();
        $docentes->each(function ($user) {
            $user->assignRole('docente');
        });

        // Crear administrativos usando factory
        $administrativos = User::factory(50)->create();
        $administrativos->each(function ($user) {
            $user->assignRole('administrativo');
        });
    }
}