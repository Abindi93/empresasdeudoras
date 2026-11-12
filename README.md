# Empresas Deudoras

Aplicación para publicar y consultar testimonios sobre experiencias de cobro empresarial. El repositorio contiene el frontend de Next.js y una API independiente en Node.js/Express.

## Estructura

```text
.
├── app/                 # Frontend Next.js
├── components/          # Componentes de interfaz
├── lib/                 # Tipos, cliente de API y datos semilla
└── server/              # API Node.js/Express
```

## Ejecutar en desarrollo

Necesitas Node.js 20 o superior. Abre dos terminales:

```bash
# Terminal 1: API Node
cd server
npm install
cp .env.example .env
npm run dev
```

```bash
# Terminal 2: frontend Next.js
npm install
cp .env.example .env.local
npm run dev
```

El frontend queda en `http://localhost:3000` y la API en `http://localhost:4000`.

## API inicial

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health` | Estado del servicio. |
| `GET` | `/api/stories` | Lista historias; acepta `q`, `category`, `country`, `city` y `sort`. |
| `GET` | `/api/stories/:slug` | Obtiene una historia. |
| `GET` | `/api/companies` | Lista empresas. |
| `GET` | `/api/companies/:slug` | Obtiene una empresa. |
| `GET` | `/api/companies/:slug/stories` | Historias de una empresa. |
| `POST` | `/api/submissions` | Recibe un testimonio para revisión. |

Las historias y empresas actuales se sirven desde los datos semilla existentes. Las nuevas historias enviadas se guardan localmente en `server/data/submissions.json`, un archivo ignorado por Git porque puede contener datos personales. Antes de producción, sustituye esa capa por una base de datos administrada y almacenamiento privado para las evidencias.

## Configuración

El frontend usa `NEXT_PUBLIC_API_URL` para conectar a la API; por defecto utiliza `http://localhost:4000`. Configura `CORS_ORIGIN` en `server/.env` con el dominio del frontend en cada entorno.
