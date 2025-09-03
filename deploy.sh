#!/bin/bash

# Скрипт развертывания РУЛЬ+ на VPS
# Использование: ./deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="rulplus"
PROJECT_DIR="/var/www/$PROJECT_NAME"

echo "🚀 Начинаем развертывание $PROJECT_NAME в среде: $ENVIRONMENT"

# Проверяем, что мы находимся в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: запустите скрипт из корневой директории проекта"
    exit 1
fi

# Создаем необходимые директории
echo "📁 Создаем директории..."
sudo mkdir -p $PROJECT_DIR
sudo mkdir -p $PROJECT_DIR/logs
sudo mkdir -p $PROJECT_DIR/uploads
sudo mkdir -p $PROJECT_DIR/uploads/documents
sudo mkdir -p $PROJECT_DIR/ssl

# Устанавливаем правильные права
sudo chown -R $USER:$USER $PROJECT_DIR

# Копируем файлы проекта
echo "📋 Копируем файлы проекта..."
rsync -av --exclude='node_modules' --exclude='.git' --exclude='*.log' ./ $PROJECT_DIR/

# Переходим в директорию проекта
cd $PROJECT_DIR

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
cd server
npm ci --production=false

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Копируем клиентскую сборку
echo "📄 Копируем клиентские файлы..."
cp -r ../client/dist/* ../server/public/

# Настраиваем переменные окружения
echo "⚙️ Настраиваем переменные окружения..."
if [ "$ENVIRONMENT" = "production" ]; then
    cp .env.production .env
else
    cp .env.staging .env
fi

# Запускаем миграции базы данных
echo "🗄️ Запускаем миграции базы данных..."
npx prisma generate
npx prisma db push

# Запускаем приложение через PM2
echo "🚀 Запускаем приложение..."
pm2 stop $PROJECT_NAME-app 2>/dev/null || true
pm2 delete $PROJECT_NAME-app 2>/dev/null || true
pm2 start ecosystem.config.js --env production

# Настраиваем Nginx (если нужно)
echo "🌐 Настраиваем Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/$PROJECT_NAME
sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Настраиваем SSL (Let's Encrypt)
echo "🔒 Настраиваем SSL сертификат..."
sudo certbot --nginx -d your-domain.com

# Настраиваем firewall
echo "🔥 Настраиваем firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Настраиваем автоматические обновления
echo "🔄 Настраиваем автоматические обновления..."
sudo cp update-service.sh /etc/cron.daily/$PROJECT_NAME-update
sudo chmod +x /etc/cron.daily/$PROJECT_NAME-update

echo "✅ Развертывание завершено успешно!"
echo "🌐 Приложение доступно по адресу: https://your-domain.com"
echo "📊 Мониторинг: pm2 monit"
echo "📝 Логи: pm2 logs $PROJECT_NAME-app"
