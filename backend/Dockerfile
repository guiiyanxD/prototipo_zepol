# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar TODAS las dependencias (necesarias para compilar)
RUN npm install

# Generar Prisma Client (requerido para los imports)
RUN npx prisma generate

# Copiar código fuente
COPY tsconfig.json ./
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Stage 2: Run
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

# Instalar SOLO dependencias de producción
RUN npm install --omit=dev

# Copiar el Prisma Client generado
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copiar la carpeta prisma (necesaria para ejecutar migraciones)
COPY --from=builder /app/prisma ./prisma

# Copiar el código compilado
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
