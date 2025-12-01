FROM node:22

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 4000

# Run compiled JS (dist/index.js)
CMD ["node", "dist/index.js"]