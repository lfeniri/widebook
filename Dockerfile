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

# Étape 1 : Installer les deps (rapide grâce au cache Docker)
COPY package.json package-lock.json* ./
RUN npm ci

# Étape 2 : Copier le schéma Prisma et générer le client
COPY prisma ./prisma/
COPY .env ./
RUN npx prisma generate

# Étape 3 : Copier le reste de l'application
COPY . .

# Étape 4 : Build de l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande finale
CMD npx prisma migrate deploy && npm start
