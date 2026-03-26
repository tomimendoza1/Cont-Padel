FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/db/package.json ./packages/db/package.json

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start", "--workspace=@padel/api"]
