# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Create the production image
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main"]
