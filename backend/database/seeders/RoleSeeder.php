<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'responsable',
            'docente', 
            'administrativo'
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $permissions = [
            'gestionar-instituciones',
            'gestionar-colegios',
            'gestionar-usuarios',
            'ver-reportes',
            'asignar-usuarios'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Asignar permisos a roles
        $responsable = Role::findByName('responsable');
        $responsable->givePermissionTo(['gestionar-instituciones', 'gestionar-colegios', 'gestionar-usuarios', 'asignar-usuarios']);

        $docente = Role::findByName('docente');
        $docente->givePermissionTo(['ver-reportes']);

        $administrativo = Role::findByName('administrativo');
        $administrativo->givePermissionTo(['ver-reportes']);
    }
}