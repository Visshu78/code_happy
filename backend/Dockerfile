# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start command
CMD ["npm", "run", "start:prod"]