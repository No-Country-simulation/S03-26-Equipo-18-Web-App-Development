# Auth endpoints

Base path:

```http
/auth
```

## POST /login

Autentica un usuario activo y devuelve un access token.

### Body

```json
{
  "email": "admin@test.com",
  "password": "12345678"
}
```

### Respuesta exitosa

```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "Admin User",
      "email": "admin@test.com",
      "role": "ADMIN",
      "active": true
    }
  }
}
```

### Posibles errores

- `400 VALIDATION_ERROR`: datos inválidos
- `401 AUTH_INVALID_CREDENTIALS`: credenciales inválidas
- `403 USER_INACTIVE`: usuario inactivo

---

## GET /me

Retorna la información pública del usuario autenticado.

### Headers

```http
Authorization: Bearer <token>
```

### Respuesta exitosa

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "ADMIN",
    "active": true
  }
}
```

### Posibles errores

- `401 AUTH_INVALID_TOKEN`: token inválido o expirado
- `404 USER_NOT_FOUND`: usuario no encontrado
- `403 USER_INACTIVE`: usuario inactivo

---

## POST /register

Crea un nuevo usuario.

### Restricción

Solo usuarios con rol `ADMIN` pueden usar este endpoint.

## Seed inicial para crear el usuario ADMIN

Como el endpoint `POST /register` solo puede ser usado por usuarios con rol `ADMIN`, primero se debe crear un usuario administrador inicial mediante una seed.

Ejecutar el comando:

```
npx prisma db seed
```

ó ejecutar dentro del servicio backend:

```
docker compose exec backend yarn prisma db seed
```
se puede verificar usando pgAdmin realizando la consulta: 

```
SELECT * FROM public.usuarios
ORDER BY id ASC 
```

### Headers

```http
Authorization: Bearer <token-admin>
Content-Type: application/json
```

### Body

```json
{
  "name": "Usuario Editor",
  "email": "editor1@test.com",
  "password": "12345678",
  "role": "EDITOR"
}
```

### Roles permitidos

- `ADMIN`

### Respuesta exitosa


```json
{
  "success": true,
  "data": {
    "token": "jwt-token-del-usuario-creado",
    "user": {
      "id": "new-user-id",
      "name": "Usuario Editor",
      "email": "editor1@test.com",
      "role": "EDITOR",
      "active": true
    }
  }
}
```

### Posibles errores

- `400 VALIDATION_ERROR`: datos inválidos
- `401 AUTH_INVALID_TOKEN`: token inválido o expirado
- `403 AUTH_FORBIDDEN`: el usuario no tiene permisos
- `409 USER_ALREADY_EXISTS`: el correo ya está registrado
