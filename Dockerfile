# Dockerfile для РУЛЬ+ приложения
FROM node:18-alpine AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json файлы
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Устанавливаем зависимости
FROM base AS deps
RUN npm ci --production=false

# Собираем клиентскую часть
FROM base AS client-builder
COPY client ./client
RUN cd client && npm run build

# Собираем серверную часть
FROM base AS server-builder
COPY server ./server
RUN cd server && npm run build

# Финальный образ
FROM node:18-alpine AS runner

# Устанавливаем необходимые пакеты
RUN apk add --no-cache dumb-init

# Создаем пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 rulplus

# Создаем директории
RUN mkdir -p /app/uploads/documents
RUN mkdir -p /app/logs

# Устанавливаем права
RUN chown -R rulplus:nodejs /app

# Переключаемся на пользователя
USER rulplus

# Копируем собранные файлы
COPY --from=deps --chown=rulplus:nodejs /app/node_modules ./node_modules
COPY --from=client-builder --chown=rulplus:nodejs /app/client/dist ./client/dist
COPY --from=server-builder --chown=rulplus:nodejs /app/server/dist ./server/dist
COPY --from=server-builder --chown=rulplus:nodejs /app/server/package*.json ./server/
COPY --from=server-builder --chown=rulplus:nodejs /app/server/prisma ./server/prisma

# Копируем остальные файлы
COPY --chown=rulplus:nodejs . .

# Устанавливаем production зависимости для сервера
RUN cd server && npm ci --production && npx prisma generate

# Открываем порт
EXPOSE 5000

# Точка входа
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/dist/server.js"]
