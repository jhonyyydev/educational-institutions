<?php

namespace Database\Seeders;

use App\Models\Commune;
use Illuminate\Database\Seeder;

class CommuneSeeder extends Seeder
{
    public function run(): void
    {
        $communes = [
            // Región Metropolitana (RM - id: 7)
            ['name' => 'Santiago', 'code' => '13101', 'region_id' => 7],
            ['name' => 'Cerrillos', 'code' => '13102', 'region_id' => 7],
            ['name' => 'Cerro Navia', 'code' => '13103', 'region_id' => 7],
            ['name' => 'Conchalí', 'code' => '13104', 'region_id' => 7],
            ['name' => 'El Bosque', 'code' => '13105', 'region_id' => 7],
            ['name' => 'Estación Central', 'code' => '13106', 'region_id' => 7],
            ['name' => 'Huechuraba', 'code' => '13107', 'region_id' => 7],
            ['name' => 'Independencia', 'code' => '13108', 'region_id' => 7],
            ['name' => 'La Cisterna', 'code' => '13109', 'region_id' => 7],
            ['name' => 'La Florida', 'code' => '13110', 'region_id' => 7],
            ['name' => 'La Granja', 'code' => '13111', 'region_id' => 7],
            ['name' => 'La Pintana', 'code' => '13112', 'region_id' => 7],
            ['name' => 'La Reina', 'code' => '13113', 'region_id' => 7],
            ['name' => 'Las Condes', 'code' => '13114', 'region_id' => 7],
            ['name' => 'Lo Barnechea', 'code' => '13115', 'region_id' => 7],
            ['name' => 'Maipú', 'code' => '13116', 'region_id' => 7],
            ['name' => 'Ñuñoa', 'code' => '13117', 'region_id' => 7],
            ['name' => 'Pedro Aguirre Cerda', 'code' => '13118', 'region_id' => 7],
            ['name' => 'Peñalolén', 'code' => '13119', 'region_id' => 7],
            ['name' => 'Providencia', 'code' => '13120', 'region_id' => 7],
            ['name' => 'Pudahuel', 'code' => '13121', 'region_id' => 7],
            ['name' => 'Puente Alto', 'code' => '13122', 'region_id' => 7],
            ['name' => 'Quilicura', 'code' => '13123', 'region_id' => 7],
            ['name' => 'Quinta Normal', 'code' => '13124', 'region_id' => 7],
            ['name' => 'Recoleta', 'code' => '13125', 'region_id' => 7],
            ['name' => 'Renca', 'code' => '13126', 'region_id' => 7],
            ['name' => 'San Joaquín', 'code' => '13127', 'region_id' => 7],
            ['name' => 'San Miguel', 'code' => '13128', 'region_id' => 7],
            ['name' => 'San Ramón', 'code' => '13129', 'region_id' => 7],
            ['name' => 'Vitacura', 'code' => '13130', 'region_id' => 7],

            // Región de Valparaíso (V - id: 6)
            ['name' => 'Valparaíso', 'code' => '05101', 'region_id' => 6],
            ['name' => 'Casablanca', 'code' => '05102', 'region_id' => 6],
            ['name' => 'Concón', 'code' => '05103', 'region_id' => 6],
            ['name' => 'Juan Fernández', 'code' => '05104', 'region_id' => 6],
            ['name' => 'Puchuncaví', 'code' => '05105', 'region_id' => 6],
            ['name' => 'Quintero', 'code' => '05106', 'region_id' => 6],
            ['name' => 'Viña del Mar', 'code' => '05107', 'region_id' => 6],
            ['name' => 'Isla de Pascua', 'code' => '05201', 'region_id' => 6],
            ['name' => 'Los Andes', 'code' => '05301', 'region_id' => 6],
            ['name' => 'Calle Larga', 'code' => '05302', 'region_id' => 6],
            ['name' => 'Rinconada', 'code' => '05303', 'region_id' => 6],
            ['name' => 'San Esteban', 'code' => '05304', 'region_id' => 6],

            // Región del Biobío (VIII - id: 11)
            ['name' => 'Concepción', 'code' => '08101', 'region_id' => 11],
            ['name' => 'Coronel', 'code' => '08102', 'region_id' => 11],
            ['name' => 'Chiguayante', 'code' => '08103', 'region_id' => 11],
            ['name' => 'Florida', 'code' => '08104', 'region_id' => 11],
            ['name' => 'Hualqui', 'code' => '08105', 'region_id' => 11],
            ['name' => 'Lota', 'code' => '08106', 'region_id' => 11],
            ['name' => 'Penco', 'code' => '08107', 'region_id' => 11],
            ['name' => 'San Pedro de la Paz', 'code' => '08108', 'region_id' => 11],
            ['name' => 'Santa Juana', 'code' => '08109', 'region_id' => 11],
            ['name' => 'Talcahuano', 'code' => '08110', 'region_id' => 11],
            ['name' => 'Tomé', 'code' => '08111', 'region_id' => 11],
            ['name' => 'Hualpén', 'code' => '08112', 'region_id' => 11],

            // Región de La Araucanía (IX - id: 12)
            ['name' => 'Temuco', 'code' => '09101', 'region_id' => 12],
            ['name' => 'Carahue', 'code' => '09102', 'region_id' => 12],
            ['name' => 'Cunco', 'code' => '09103', 'region_id' => 12],
            ['name' => 'Curarrehue', 'code' => '09104', 'region_id' => 12],
            ['name' => 'Freire', 'code' => '09105', 'region_id' => 12],
            ['name' => 'Galvarino', 'code' => '09106', 'region_id' => 12],
            ['name' => 'Gorbea', 'code' => '09107', 'region_id' => 12],
            ['name' => 'Lautaro', 'code' => '09108', 'region_id' => 12],
            ['name' => 'Loncoche', 'code' => '09109', 'region_id' => 12],
            ['name' => 'Melipeuco', 'code' => '09110', 'region_id' => 12],
            ['name' => 'Nueva Imperial', 'code' => '09111', 'region_id' => 12],
            ['name' => 'Padre las Casas', 'code' => '09112', 'region_id' => 12],
            ['name' => 'Perquenco', 'code' => '09113', 'region_id' => 12],
            ['name' => 'Pitrufquén', 'code' => '09114', 'region_id' => 12],
            ['name' => 'Pucón', 'code' => '09115', 'region_id' => 12],
            ['name' => 'Saavedra', 'code' => '09116', 'region_id' => 12],
            ['name' => 'Teodoro Schmidt', 'code' => '09117', 'region_id' => 12],
            ['name' => 'Toltén', 'code' => '09118', 'region_id' => 12],
            ['name' => 'Vilcún', 'code' => '09119', 'region_id' => 12],
            ['name' => 'Villarrica', 'code' => '09120', 'region_id' => 12],
            ['name' => 'Cholchol', 'code' => '09121', 'region_id' => 12],

            // Algunas otras regiones importantes
            ['name' => 'Arica', 'code' => '15101', 'region_id' => 1],
            ['name' => 'Camarones', 'code' => '15102', 'region_id' => 1],
            ['name' => 'Putre', 'code' => '15201', 'region_id' => 1],
            ['name' => 'General Lagos', 'code' => '15202', 'region_id' => 1],

            ['name' => 'Iquique', 'code' => '01101', 'region_id' => 2],
            ['name' => 'Alto Hospicio', 'code' => '01107', 'region_id' => 2],
            ['name' => 'Pozo Almonte', 'code' => '01401', 'region_id' => 2],
            ['name' => 'Pica', 'code' => '01402', 'region_id' => 2],

            ['name' => 'Antofagasta', 'code' => '02101', 'region_id' => 3],
            ['name' => 'Mejillones', 'code' => '02102', 'region_id' => 3],
            ['name' => 'Sierra Gorda', 'code' => '02103', 'region_id' => 3],
            ['name' => 'Taltal', 'code' => '02104', 'region_id' => 3],
            ['name' => 'Calama', 'code' => '02201', 'region_id' => 3],
            ['name' => 'Ollagüe', 'code' => '02202', 'region_id' => 3],
            ['name' => 'San Pedro de Atacama', 'code' => '02301', 'region_id' => 3],
        ];

        foreach ($communes as $commune) {
            Commune::create($commune);
        }
    }
}