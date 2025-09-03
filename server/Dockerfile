# Dockerfile для Node.js backend
FROM node:18-alpine AS development

# Установка рабочей директории
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Создание необходимых директорий
RUN mkdir -p uploads logs

# Открытие порта
EXPOSE 5000

# Запуск в dev режиме
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm ci --only=production

# Копирование исходного кода
COPY . .

# Сборка TypeScript
RUN npm run build

# Production image
FROM node:18-alpine AS production

# Создание пользователя node
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Копирование зависимостей
COPY --from=builder /app/node_modules ./node_modules

# Копирование собранного приложения
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Создание необходимых директорий
RUN mkdir -p uploads logs

# Установка прав
RUN chown -R nodejs:nodejs /app
USER nodejs

# Открытие порта
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); \
    http.get('http://localhost:5000/health', (res) => { \
      if (res.statusCode === 200) process.exit(0); \
      else process.exit(1); \
    }).on('error', () => process.exit(1));"

# Запуск приложения
CMD ["node", "dist/server.js"] 