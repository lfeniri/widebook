# Use Node.js 20 as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package.json and package-lock.json files
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies using npm
RUN npm ci

# Copy the rest of the application
COPY . .

# Build application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set up the entrypoint to run migrations and start app
CMD npx prisma migrate deploy && npm start