# Multi-stage Dockerfile for production deployment
# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /frontend

# Copy frontend package files
COPY nabbasic/package*.json ./
RUN npm ci --only=production

# Copy frontend source and build
COPY nabbasic/ ./
RUN npm run build

# Stage 2: Production Runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY nabBack/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy backend source code
COPY nabBack/ ./

# Copy built frontend from stage 1
COPY --from=frontend-builder /frontend/../nabBack/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose application port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "server.js"]
