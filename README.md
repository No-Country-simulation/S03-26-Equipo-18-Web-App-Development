# Testimonial-cms

# Testimonial CMS - Backend

Backend del proyecto Testimonial CMS construido con Node.js, Express, TypeScript, Prisma y PostgreSQL, ejecutado con Docker Compose.

## Requisitos

Antes de empezar, asegúrate de tener instalado:

- Docker Desktop
- Docker Compose

Importante: Docker Desktop debe estar abierto y en ejecución antes de correr los comandos.

## Estructura general

El backend se encuentra dentro de:

apps/backend

## Variables de entorno

Copia el archivo de ejemplo y créalo como .env dentro de apps/backend:

cp .env.example .env

Si estás en Windows PowerShell, puedes copiarlo manualmente o usar:

Copy-Item .env.example .env

Ejemplo de .env:

PORT=3000
DATABASE_URL="postgresql://postgres:postgres@db:5432/testimonial_cms?schema=public"

## Levantar el proyecto

Desde la carpeta apps/backend, ejecuta:

docker compose up --build

Este comando construye las imágenes necesarias y levanta los servicios del backend y la base de datos.

## Levantar en segundo plano

Si quieres dejar los contenedores corriendo en background:

docker compose up --build -d

## Detener el proyecto

Para detener y eliminar los contenedores del stack:

docker compose down

## Detener y borrar volúmenes

Si quieres eliminar también la base de datos local y dejar todo limpio:

docker compose down -v

Nota: esto borra los datos persistidos en los volúmenes de Docker.

## Verificar que funciona

Si todo arrancó bien, deberías poder abrir:

http://localhost:3000/health

Y recibir una respuesta similar a:

{
  "ok": true
}

## Comandos útiles

Ver contenedores activos:

docker compose ps

Ver logs del backend:

docker compose logs -f api

Ver logs de la base de datos:

docker compose logs -f db

Reiniciar los servicios:

docker compose down
docker compose up --build

## Instalación local sin Docker

Si en algún momento quieres instalar dependencias manualmente:

npm install

Y luego correr el backend en modo desarrollo:

npm run dev

Este flujo no es necesario para usar el proyecto. El flujo recomendado es Docker Compose.

## Base de datos

El proyecto usa PostgreSQL como base de datos local de desarrollo.
Prisma se conecta a través de la variable DATABASE_URL definida en el archivo .env.

## Notas importantes

- No subas tu archivo .env al repositorio.
- Sí debes subir .env.example.
- No subas node_modules.
- No subas archivos generados o temporales que no formen parte del código fuente.

## Problemas comunes

Docker Desktop no está corriendo:
Si aparece un error similar a que no se puede conectar con Docker, asegúrate de abrir Docker Desktop primero.

El puerto 3000 ya está ocupado:
Cierra el proceso que esté usando el puerto o cambia el valor de PORT en .env.

La base de datos no inicia:
Revisa los logs con:

docker compose logs -f db

## Estado del proyecto

Este proyecto está en desarrollo y la estructura inicial del backend ya está preparada para crecer por módulos como:

- auth
- testimonios
- categorías
- tags
- upload
- analytics
- api pública


## Base de datos y pgAdmin

La base de datos se ejecuta dentro de Docker con PostgreSQL.  
Para visualizar las tablas sin instalar PostgreSQL en tu máquina, se incluye un contenedor de pgAdmin accesible en el navegador.

### Cómo usar pgAdmin

1. Levanta el stack:
   docker compose up -d
2. Abre en el navegador:
   http://localhost:5050
3. Inicia sesión con:
   - Email: example@example.com
   - Password: any_password
4. Crea una nueva conexión:
   - Host: host_example
   - Port: number_port_db
   - Username: user_example
   - Password: any_password
   - Database: db_name

Desde ahí podrás visualizar todas las tablas del modelo de datos (usuarios, testimonios, categorías, tags, etc.).
