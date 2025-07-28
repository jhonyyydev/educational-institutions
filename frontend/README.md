# Sistema de Gestión de Instituciones Educativas - Frontend

Sistema web para la gestión integral de instituciones educativas, colegios y usuarios. Desarrollado con Next.js 15, TypeScript y Tailwind CSS.

## Características

- **Sistema de autenticación** completo con JWT
- **Gestión de instituciones** educativas
- **Integración con regiones y comunas** de Chile
- **Interfaz moderna**
- **Validación en tiempo real** de RUT (UK)
- **Dashboard administrativo**
- **Optimizado para producción**

## Tecnologías

### Frontend
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **TanStack Query** - Gestión de estado del servidor
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **TypeScript** - Verificación de tipos

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.17.0 (recomendado: 20.x)
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git** para clonar el repositorio

Verificar versiones:
```bash
node --version
npm --version
git --version
```

## Instalación

### 1. Acceder al frontend

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
# Con npm
npm install

# O con yarn
yarn install
```

### 3. Limpiar caché (si es necesario)

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Configuración

### Variables de Entorno

Ir al archivo `src/shared/utils/constants.ts` y comentar la linea de la URL del servidor activo y colocar el puerto en el que se ejecuta localmente tu backend, que suele ser el 8000 para laravel:

export const API_BASE_URL = "https://backend-educational-institutions-production.up.railway.app/api"
//export const API_BASE_URL = "http://127.0.0.1:8000/api"

### Configuración del Backend

Este frontend requiere el backend de la API. Asegúrate de que esté ejecutándose en:
- **URL por defecto**: `http://localhost:8000`

## Ejecución

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# O con yarn
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Construir para producción
npm run start            # Servidor de producción
```

### Endpoints Principales

- **Autenticación**: `POST /auth/login`
- **Instituciones**: `GET|POST /institutions`
- **Regiones**: `GET /regions`
- **Validación RUT**: `GET /schools/validate-rut`, `GET /users/validate-rut`

### Configuración del Backend

El backend debe estar ejecutándose con las siguientes características:
- **Framework**: Laravel/FastAPI/Node.js (especificar según tu backend)
- **Base de datos**: MySQL
- **Autenticación**: JWT
- **CORS**: Configurado para `http://localhost:3000`

## Solución de Problemas

### Error de módulos no encontrados
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Error de build
```bash
rm -rf .next
npm run build
```

### Problemas de tipos TypeScript
```bash
npm run type-check
```

### Error de CORS
Verificar que el backend tenga configurado CORS para `http://localhost:3000`

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usar TypeScript para todo el código
- Seguir las reglas de ESLint configuradas
- Escribir componentes funcionales con hooks
- Usar Tailwind CSS para estilos
- Documentar funciones complejas

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
