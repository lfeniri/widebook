# Use Node.js 20 as base image
FROM node:20-alpine

# Dépendances système nécessaires pour canvas + node-gyp
RUN apk add --no-cache \
  libc6-compat \
  python3 \
  make \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  pixman-dev \
  pangomm-dev \
  librsvg \
  bash

# Set working directory
WORKDIR /app

# Étape 1 : Installer les dépendances
COPY package.json package-lock.json* ./
RUN npm ci

# Étape 2 : Copier les fichiers nécessaires à Prisma
COPY prisma ./prisma/
COPY .env ./

# Étape 3 : Générer le client Prisma (AVANT le build)
RUN npx prisma generate

# Étape 4 : Copier le reste du code
COPY . .

# Étape 5 : Build de l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# CMD final (déploiement migration + lancement app)
CMD npx prisma migrate deploy && npm start