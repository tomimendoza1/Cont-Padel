Archivos incluidos para dejar bien la integración del monorepo y Prisma.

Copiá cada archivo respetando la misma ruta dentro de tu proyecto.

Después corré desde la raíz:
1) npm install
2) npm run db:generate
3) npm run dev:web

Prueba de conexión:
- Abrí http://localhost:3000/test-db

Si la base todavía no tiene migraciones aplicadas, corré:
- npm run db:migrate
