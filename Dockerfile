# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy everything
COPY package.json ./
COPY nabbasic/ ./nabbasic/
COPY nabBack/ ./nabBack/

# Build frontend (outputs to nabBack/dist)
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy backend with built frontend
COPY nabBack/ ./nabBack/
COPY package.json ./

RUN cd nabBack && npm ci --omit=dev

# Expose both ports
EXPOSE 3000
EXPOSE 4000

# Run both servers
WORKDIR /app/nabBack
CMD ["sh", "-c", "node server.js & node adminServer.js & wait"]
