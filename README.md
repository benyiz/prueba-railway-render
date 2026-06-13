# Pokémon REST API

![Tests](https://github.com/benyiz/prueba-railway-render/actions/workflows/test.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)

REST API de Pokémon con autenticación JWT, tests automatizados y CI/CD con GitHub Actions.

🚀 **Deploy:** https://prueba-railway-render-production.up.railway.app

---

## Features

- 🔐 Autenticación con JWT y contraseñas encriptadas con bcrypt
- 🛡️ Rate limiting contra ataques de fuerza bruta
- 📋 Logging de requests con Morgan
- ✅ Tests de integración con Jest + Supertest
- ⚙️ CI/CD automático con GitHub Actions
- 🐳 Entorno de testing aislado con Docker

---

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/register` | Registra un usuario nuevo | ❌ |
| POST | `/login` | Inicia sesión y devuelve un token JWT | ❌ |

**Body requerido:**
```json
{
  "email": "usuario@example.com",
  "password": "tu_contraseña"
}
```

### Pokémons

> Todos los endpoints requieren el header `Authorization: Bearer <token>`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/pokemon` | Lista todos los pokémons |
| GET | `/pokemon/:id` | Obtiene un pokémon por ID |
| POST | `/pokemon` | Crea un pokémon nuevo |
| PUT | `/pokemon/:id` | Actualiza el nombre de un pokémon |
| DELETE | `/pokemon/:id` | Elimina un pokémon |

**Body para POST y PUT:**
```json
{
  "nombre": "Pikachu"
}
```

---

## Stack

| Tecnología | Uso |
|-----------|-----|
| Node.js + Express | Servidor HTTP |
| PostgreSQL + Prisma 7 | Base de datos y ORM |
| JWT + bcrypt | Autenticación y seguridad |
| Docker Compose | Entorno de testing |
| Jest + Supertest | Tests de integración |
| GitHub Actions | CI/CD |
| Railway | Deploy en producción |

---

## Correr localmente

### Requisitos
- Node.js 20+
- Docker Desktop
- PostgreSQL (o usar Docker)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/benyiz/prueba-railway-render.git
cd prueba-railway-render

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Aplicar migraciones
npx prisma migrate deploy

# 5. Levantar el servidor
npm run dev
```

### Variables de entorno

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/pokeapi
JWT_SECRET=tu_secret_jwt
```

---

## Tests

Los tests corren contra una base de datos PostgreSQL aislada en Docker, separada de producción.

```bash
npm test
```

El comando automáticamente:
1. Levanta un contenedor PostgreSQL de testing
2. Aplica las migraciones
3. Corre los tests
4. Baja el contenedor

### CI/CD

Cada push a `main` dispara el pipeline en GitHub Actions que:
- Levanta un servicio PostgreSQL limpio
- Instala dependencias y genera el cliente Prisma
- Corre todos los tests
- Reporta el resultado con el badge de estado

---

## Seguridad

- **SQL Injection:** prevenida por Prisma ORM con queries parametrizadas
- **Brute Force:** rate limiting de 5 intentos por minuto en rutas de autenticación
- **Autenticación:** tokens JWT con expiración + contraseñas hasheadas con bcrypt
- **Logging:** Morgan registra todas las requests para auditoría