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
2. 2. Abre en el navegador:
   http://localhost:5050
3. Inicia sesión con:
   - Email: admin@admin.com
   - Password: admin
4. Crea una nueva conexión:
   - Host: db
   - Port: 5432
   - Username: postgres
   - Password: postgres
   - Database: testimonial_cms

Desde ahí podrás visualizar todas las tablas del modelo de datos (usuarios, testimonios, categorías, tags, etc.).

## CRUD Testimonios

### Ruta
GET /api/private/testimonios

### Query params sugeridos
page=1
limit=10
q=
status=
type=
categoryId=
createdById=
sortBy=createdAt
sortOrder=desc


### Respuesta Exitosa
{
  "success": true,
  "data": [
    {
      "id": "....",
      "title": "...."
    }
  ],
  "meta": {
    "total": 48,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}

## Documentación
## Endpoint: `POST /api/public/testimonials`

### Campos que DEBE enviar el frontend

**REQUERIDOS:**
```json
{
  "title": "Excelente experiencia",
  "content": "La plataforma mejoró nuestro flujo de trabajo...",
  "authorName": "Jane Smith",
  "type": "TEXT"
}
```

**OPCIONALES:**
```json
{
  "authorPosition": "Gerente de Marketing",
  "authorEmail": "jane@ejemplo.com", 
  "authorCompany": "Acme Corp",
  "imageUrl": "https://cdn.ejemplo.com/imagen.jpg",
  "videoUrl": "https://cdn.ejemplo.com/video.mp4",
  "youtubeId": "dQw4w9WgXcQ",
  "categoryId": "cmabc123456"
}
```

### Payload completo de ejemplo
```json
{
  "title": "Excelente experiencia con la plataforma",
  "content": "La plataforma mejoró nuestro flujo de trabajo y nos ayudó a gestionar mejor los testimonios.",
  "authorName": "Jane Smith",
  "authorPosition": "Gerente de Marketing",
  "authorEmail": "jane@ejemplo.com",
  "authorCompany": "Acme Corp",
  "type": "TEXT",
  "imageUrl": null,
  "videoUrl": null,
  "youtubeId": null,
  "categoryId": "cmabc123456"
}
```

## ⚠️ NO enviar estos campos (backend los genera)

❌ id
❌ status
❌ rejectionReason
❌ views
❌ clicks
❌ isFeatured
❌ createdById
❌ adminId
❌ createdAt
❌ updatedAt
❌ publishedAt


**Backend establece por defecto:**
- `status` → `PENDING`
- `views` → `0`
- `clicks` → `0`
- `isFeatured` → `false`

## Reglas por tipo de testimonio

### 📝 TEXT (recomendado para básico)
```json
{
  "title": "Excelente soporte",
  "content": "El equipo resolvió nuestros problemas rápidamente.",
  "authorName": "Juan Pérez",
  "type": "TEXT"
}
```

### 🖼️ IMAGE
```json
{
  "title": "Excelente producto", 
  "content": "Gran experiencia con el producto.",
  "authorName": "María García",
  "type": "IMAGE",
  "imageUrl": "https://cdn.ejemplo.com/imagen.jpg"
}
```

### 🎥 VIDEO
**Con videoUrl:**
```json
{
  "title": "Testimonio en video",
  "content": "Nuestro equipo grabó este testimonio.",
  "authorName": "Carlos López", 
  "type": "VIDEO",
  "videoUrl": "https://cdn.ejemplo.com/video.mp4"
}
```

**Con youtubeId:**
```json
{
  "title": "Testimonio en video",
  "content": "Nuestro equipo grabó este testimonio.",
  "authorName": "Carlos López",
  "type": "VIDEO", 
  "youtubeId": "dQw4w9WgXcQ"
}
```

## Validaciones frontend recomendadas
✅ title: mínimo 2 caracteres
✅ content: mínimo 10 caracteres
✅ authorName: mínimo 2 caracteres
✅ authorEmail: email válido (si se envía)
✅ type: TEXT|IMAGE|VIDEO

🔄 Si type=IMAGE → imageUrl requerido
🔄 Si type=VIDEO → videoUrl O youtubeId requerido
🔄 Si type=TEXT → media opcional (null)


## Respuestas esperadas

### ✅ HTTP 201 (éxito)
```json
{
  "success": true,
  "data": {
    "id": "cmabc123456",
    "message": "Tu testimonio fue recibido y está pendiente de revisión"
  }
}
```

### ❌ HTTP 400 (validación)
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Datos inválidos",
  "details": {
    "title": ["Debe tener al menos 2 caracteres"],
    "content": ["Debe tener al menos 10 caracteres"]
  }
}
```

## Ejemplo cURL completo
```bash
curl -X POST "http://localhost:3000/api/public/testimonials" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "¡Servicio increíble!",
    "content": "El equipo superó nuestras expectativas.",
    "authorName": "Juan Pérez", 
    "authorEmail": "juan@ejemplo.com",
    "type": "TEXT"
  }'
```

## Payload mínimo seguro (recomendado)
```json
{
  "title": "Excelente experiencia",
  "content": "La plataforma mejoró nuestro flujo de trabajo.",
  "authorName": "Jane Smith",
  "type": "TEXT"
}
```

## 📱 Notas para frontend

✅ **Siempre enviar** `type`  
❌ **NO enviar** campos de admin  
🎯 **Preferir** `TEXT` para testimonios básicos  
🖼️ **Usar** `IMAGE` solo con `imageUrl`  
🎥 **Usar** `VIDEO` solo con `videoUrl`/`youtubeId`  
⏳ **Estado inicial**: `PENDING` (no se publica inmediatamente)

---

## Documentación Swagger

La API cuenta con documentación interactiva generada con Swagger/OpenAPI, donde se pueden consultar los endpoints disponibles, los parámetros requeridos, los ejemplos de solicitud y las respuestas esperadas.

### Cómo ejecutar la documentación

1. Levanta el proyecto backend en tu entorno local.
2. Verifica que el servidor esté corriendo correctamente.
3. Abre tu navegador y accede a la ruta de documentación de Swagger.

### Endpoint para ver la documentación

La documentación se puede visualizar en el siguiente endpoint:

```bash
http://localhost:3000/api-docs
```

### JSON de la documentación

Si necesitas consumir la especificación OpenAPI en formato JSON, puedes usar:

```bash
http://localhost:3000/api-docs.json
```

### Qué puedes encontrar allí

En Swagger podrás ver:

- Los endpoints públicos y privados.
- Los parámetros de ruta, query y body.
- Los modelos de request y response.
- Ejemplos de uso para cada endpoint.
- Los códigos de respuesta posibles.
- La autenticación requerida para endpoints protegidos.

### Autenticación

Para consumir los endpoints privados desde Swagger, debes ingresar un token JWT en el apartado de autorización con el formato:

```bash
Bearer TU_TOKEN
```

### Nota

Si la documentación no carga, verifica que:

- El backend esté ejecutándose correctamente.
- El archivo de configuración de Swagger esté incluido en el proyecto.
- Los schemas y rutas documentadas estén bien definidos.
