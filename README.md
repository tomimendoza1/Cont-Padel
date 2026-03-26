# Padel Club System

Monorepo base para un sistema de marcador y control de canchas de pádel.

## Estructura

- `apps/web`: frontend en Next.js pensado para Vercel
- `apps/api`: backend realtime con Express + Socket.io
- `packages/db`: Prisma + Neon

## Requisitos

- Node.js 20+
- Una base PostgreSQL en Neon
- npm 10+

## Variables

Copiá los archivos `.env.example` a `.env` en:
- `apps/api`
- `apps/web`
- `packages/db`

## Instalación

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev:api
npm run dev:web
```

## URLs locales

- Frontend: `http://localhost:3000`
- API realtime: `http://localhost:4000`

## Despliegue sugerido

- `apps/web` -> Vercel
- `apps/api` -> Railway / Render / Fly.io
- `packages/db` -> Neon + Prisma migrations
