# Tavern Tales

Tavern Tales es una aplicación web para la gestión de personajes y campañas de juegos de rol. Permite a los usuarios registrarse, crear y administrar personajes, gestionar su perfil, y participar en partidas y recursos relacionados con el juego.

## Características principales

- Registro e inicio de sesión de usuarios con roles (Master y Jugador).
- Gestión de perfil de usuario, incluyendo edición de datos y carga de imagen de perfil.
- Creación y listado de personajes con atributos personalizables.
- Gestión de partidas y recursos del juego.
- Visualización de noticias para usuarios y administradores.

## Tecnologías utilizadas

- Backend: Laravel (PHP)
- Frontend: Angular
- Base de datos: MySQL
- Autenticación: Laravel Sanctum

## Instalación y configuración

### Backend

1. Clonar el repositorio y acceder a la carpeta `backendTT`.
2. Instalar dependencias con Composer:
   ```
   composer install
   ```
3. Configurar el archivo `.env` con los datos de conexión a la base de datos y otras variables de entorno.
4. Ejecutar migraciones y seeders:
   ```
   php artisan migrate --seed
   ```
5. Iniciar el servidor de desarrollo:
   ```
   php artisan serve --host=localhost --port=8000
   ```

### Frontend

1. Acceder a la carpeta `frontendTT`.
2. Instalar dependencias con npm:
   ```
   npm install
   ```
3. Construir la aplicación:
   ```
   npm run build
   ```
4. Iniciar el servidor de desarrollo:
   ```
   npm start
   ```
   o
   ```
   ng serve
   ```

## Uso

- Acceda a la aplicación en el navegador en la URL donde esté corriendo el frontend.
- Regístrese como usuario Master o Jugador.
- Cree y gestione sus personajes desde la sección correspondiente.
- Edite su perfil y mantenga su información actualizada.
- Explore las partidas, recursos y noticias disponibles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abra un issue o un pull request para sugerir mejoras o reportar problemas.

## Licencia

Este proyecto está bajo la licencia MIT.
