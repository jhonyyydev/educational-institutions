# Educational Institutions API - Backend (Laravel 12 + Sanctum)

Este proyecto corresponde al **backend del sistema de gestión de instituciones educativas**, desarrollado con **Laravel 12**, utilizando **Sanctum para la autenticación API Token-Based**.

## URL de Producción (Despliegue)
El backend se encuentra desplegado en un servidor en la siguiente URL:

> **https://backend-educational-institutions-production.up.railway.app/api**

---

## Tecnologías utilizadas

- **Laravel 12.x (PHP 8.2)**
- **Sanctum (Autenticación)**
- **MySQL (Railway Cloud Database)**
- **Spatie Laravel-Permission (Gestión de Roles & Permisos)**
- Arquitectura basada en **DDD (Domain-Driven Design)** separando **casos de uso, infraestructura y presentación**.
- Documentación de API completa en **Postman**.

---

## Estructura del Proyecto
- **app/Http/Controllers**: Controladores de API REST.
- **app/Services**: Lógica de negocio (servicios).
- **app/DTOs**: Data Transfer Objects (DTOs) para transporte estructurado de datos.
- **database/migrations**: Migraciones de la base de datos.
- **database/seeders**: Cargadores de datos iniciales.
- **routes/api.php**: Rutas de la API.
- **sanctum**: Implementación de autenticación Token.

---

## Requisitos previos
- PHP >= 8.1
- Composer
- MySQL / MariaDB
- Node.js (opcional, si compilas assets)
- Railway CLI (opcional si deseas interactuar con el entorno en Railway)
  
---

## Instalación y ejecución local

### 1. Ingresar a la carpeta del backend
```bash
cd backend
```

### 2. Ejecutar los comandos
```bash
composer install
```

### 3. Copiar el archivo de variables de entorno y configurarlas
```bash
cp .env.example .env
```

### 4. Ejecutar los comandos siguientes
```bash
php artisan key:generate
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate --seed
php artisan serve
```

### 5. Tu backend quedaria listo
El backend está diseñado para integrarse con el frontend desarrollado en Next.js (carpeta /frontend).

La autenticación se maneja mediante Sanctum Token API.

Las pruebas de endpoints en producción y local pueden realizarse mediante Postman apuntando a la URL de Railway.

