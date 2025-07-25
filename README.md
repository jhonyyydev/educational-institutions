# Sistema de Gestión de Colegios - Full Stack Test

Este repositorio contiene la solución al test técnico de desarrollo Full Stack. El sistema permite gestionar instituciones educativas, sus colegios y usuarios de manera jerárquica, facilitando la administración centralizada.

## Estructura del Proyecto

/
├── backe
├── fronte
├── DME.md
├── .gitignore → Configuración de exclusión para Git

## Tecnologías Utilizadas

- Backend: Laravel 12
- Frontend: Next.js (App Router) + Tailwind CSS
- DevOps: GitFlow (para control de ramas)

## Funcionalidades Implementadas

- Gestión de Instituciones Educativas
- Gestión de Colegios asociados a Instituciones
- Gestión de Usuarios asociados a Colegios
- Autenticación y autorización básica
- Diseño responsivo y moderno (Alineado con el Flujo UI https://xd.adobe.com/view/c5af7e63-9f75-464c-9c99-92e78306e1b2-90fc/screen/b35ea60c-dc0c-42db-a312-b01581c35a59/)

## Instalación del Proyecto

### 1. Clonar el Repositorio
git clone https://github.com/jhonyyydev/educational-institutions.git
cd educational-institutions

### 2. Backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

### 3. Frontend (Next.js)
cd ../frontend
npm install
npm run dev

## Flujo de Ramas (GitFlow)

- main → Producción
- develop → Integración de funcionalidades
- feature/* → Nuevas features
- release/* → Preparación de releases
- hotfix/* → Corrección de bugs en producción

## Licencia

Este proyecto es privado y fue desarrollado como solución a una prueba técnica de desarrollo Full Stack.

