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
  bash
RUN apk add --no-cache librsvg
# Install system dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies using npm
RUN npm ci

# Copy the rest of the application
COPY . .

#tmp fot the first time
RUN npx prisma generate && npx prisma migrate deploy


# Build application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set up the entrypoint to run migrations and start app
CMD npx prisma migrate deploy && npm start