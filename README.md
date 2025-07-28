# Sistema de Gestión de Colegios - Full Stack Test

Este repositorio contiene la solución al test técnico de desarrollo Full Stack. El sistema permite gestionar instituciones educativas, sus colegios y usuarios de manera jerárquica, facilitando la administración centralizada.
Como adición a la solución se desplegó completamente la aplicación Full Stack, el servidor con Laravel y MySql, el frontend en Vercel.

Accesible desde: https://educational-institutions-five.vercel.app/login

Credenciales de acceso (Usuario con rol 'Responsable' capaz de registrar instituciones, colegios y usuarios)

- Email: pedro.gonzalez@educacion.cl
- Password: password123 

## Tecnologías Utilizadas

- **Backend:** Laravel 12 (PHP 8.2)
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **DevOps:** GitFlow (para control de ramas)

## Funcionalidades Implementadas

- Gestión de Instituciones Educativas (CRUD)
- Gestión de Colegios asociados a Instituciones
- Gestión de Usuarios asociados a Colegios
- Autenticación y autorización básica
- Diseño responsivo y moderno (UI alineado con el flujo de diseño en Adobe XD)

## Instalación del Proyecto

### 1. Clonar el Repositorio y Ejecutar el Proyecto
```bash
git clone https://github.com/jhonyyydev/educational-institutions.git
cd educational-institutions

cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

cd ../frontend
npm install
npm run dev

Dentro del README de cada carpeta se pueden encontrar más a detalle los comandos para configurar y ejecutar el proyecto.


