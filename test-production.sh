#!/bin/bash

# Скрипт для тестирования продакшен сборки локально
echo "🧪 Тестирование продакшен сборки РУЛЬ+"

# Проверяем, что сборка существует
if [ ! -d "client/dist" ]; then
    echo "❌ Клиентская сборка не найдена. Запустите: cd client && npm run build"
    exit 1
fi

if [ ! -d "server/dist" ]; then
    echo "❌ Серверная сборка не найдена. Запустите: cd server && npm run build"
    exit 1
fi

echo "✅ Сборки найдены"

# Копируем клиентские файлы в сервер
echo "📄 Копируем клиентские файлы в сервер..."
mkdir -p server/public
cp -r client/dist/* server/public/

echo "✅ Клиентские файлы скопированы"

# Создаем .env файл для тестирования
if [ ! -f "server/.env" ]; then
    echo "⚙️ Создаем тестовый .env файл..."
    cat > server/.env << EOL
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/rulplus_db
JWT_SECRET=test_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
UPLOAD_DESTINATION=./uploads
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
ADMIN_PASSWORD=test_admin_password
EOL
    echo "✅ Тестовый .env файл создан"
fi

# Запускаем сервер
echo "🚀 Запускаем сервер в продакшен режиме..."
cd server
NODE_ENV=production node dist/server.js &
SERVER_PID=$!

echo "✅ Сервер запущен (PID: $SERVER_PID)"

# Ждем запуска сервера
sleep 3

# Проверяем, что сервер работает
if curl -f http://localhost:5000 > /dev/null 2>&1; then
    echo "✅ Сервер отвечает на запросы"
else
    echo "❌ Сервер не отвечает"
fi

# Проверяем API
if curl -f http://localhost:5000/api/services > /dev/null 2>&1; then
    echo "✅ API работает"
else
    echo "❌ API не работает"
fi

echo ""
echo "🌐 Тестирование завершено!"
echo "📱 Клиентское приложение: http://localhost:5000"
echo "🔧 API: http://localhost:5000/api"
echo ""
echo "Для остановки сервера нажмите Ctrl+C или выполните: kill $SERVER_PID"

# Ждем завершения
wait $SERVER_PID
