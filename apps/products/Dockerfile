# Use a lightweight Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files separately for caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Run tests on container startup
CMD ["pnpm", "test", "--", "--coverage"]
