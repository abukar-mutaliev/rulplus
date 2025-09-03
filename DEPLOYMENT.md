# 🚀 Руководство по развертыванию РУЛЬ+ на VPS

## 📋 Предварительные требования

### Системные требования
- Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- Минимум 2GB RAM
- Минимум 20GB дискового пространства
- Доступ по SSH

### Необходимое ПО
- Node.js 18+
- PostgreSQL 15+
- Nginx
- PM2
- Git
- Certbot (для SSL)

## 🛠️ Быстрое развертывание

### 1. Подготовка VPS

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем необходимые пакеты
sudo apt install -y curl wget git htop ufw

# Устанавливаем Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Устанавливаем PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Устанавливаем Nginx
sudo apt install -y nginx

# Устанавливаем PM2 глобально
sudo npm install -g pm2

# Устанавливаем Certbot для SSL
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Настройка PostgreSQL

```bash
# Входим в PostgreSQL
sudo -u postgres psql

# Создаем базу данных и пользователя
CREATE DATABASE rulplus_db;
CREATE USER rulplus_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE rulplus_db TO rulplus_user;
\q
```

### 3. Клонирование и настройка проекта

```bash
# Клонируем репозиторий
git clone https://github.com/your-username/rulplus.git
cd rulplus

# Устанавливаем зависимости и собираем проект
npm run build:all

# Настраиваем переменные окружения
cp server/.env.example server/.env
nano server/.env
```

### 4. Настройка переменных окружения

Отредактируйте `server/.env`:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://rulplus_user:your_secure_password_here@localhost:5432/rulplus_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://your-domain.com
MAX_FILE_SIZE=10485760
UPLOAD_DESTINATION=./uploads
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
ADMIN_PASSWORD=your_admin_password_here
```

### 5. Запуск приложения

```bash
# Переходим в директорию сервера
cd server

# Генерируем Prisma клиент
npx prisma generate

# Запускаем миграции базы данных
npx prisma db push

# Запускаем приложение через PM2
npm run pm2:start

# Проверяем статус
pm2 status
pm2 logs rulplus-app
```

### 6. Настройка Nginx

```bash
# Копируем конфигурацию Nginx
sudo cp ../nginx.conf /etc/nginx/sites-available/rulplus

# Включаем сайт
sudo ln -s /etc/nginx/sites-available/rulplus /etc/nginx/sites-enabled/

# Удаляем дефолтную конфигурацию
sudo rm /etc/nginx/sites-enabled/default

# Проверяем конфигурацию
sudo nginx -t

# Перезапускаем Nginx
sudo systemctl restart nginx
```

### 7. Настройка SSL сертификата

```bash
# Получаем бесплатный SSL сертификат
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Проверяем автоматическое обновление сертификатов
sudo certbot renew --dry-run
```

### 8. Настройка firewall

```bash
# Разрешаем необходимые порты
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 5432  # PostgreSQL (только локально)

# Включаем firewall
sudo ufw --force enable
```

## 🔄 Обновление приложения

### Автоматическое обновление
```bash
# Настраиваем cron для автоматических обновлений
sudo cp update-service.sh /etc/cron.daily/rulplus-update
sudo chmod +x /etc/cron.daily/rulplus-update
```

### Ручное обновление
```bash
# Переходим в директорию проекта
cd /var/www/rulplus

# Получаем последние изменения
git pull origin main

# Пересобираем и перезапускаем
npm run build:all
npm run pm2:restart
```

## 📊 Мониторинг

### PM2 команды
```bash
# Статус приложений
pm2 status

# Просмотр логов
pm2 logs rulplus-app

# Мониторинг в реальном времени
pm2 monit

# Перезапуск приложения
pm2 restart rulplus-app

# Остановка приложения
pm2 stop rulplus-app
```

### Nginx логи
```bash
# Просмотр логов доступа
sudo tail -f /var/log/nginx/rulplus_access.log

# Просмотр ошибок
sudo tail -f /var/log/nginx/rulplus_error.log
```

## 🐳 Альтернативное развертывание с Docker

### Быстрый запуск
```bash
# Устанавливаем Docker и Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Запускаем приложение
docker-compose up -d

# Проверяем статус
docker-compose ps
```

## 🔧 Устранение неисправностей

### Приложение не запускается
```bash
# Проверяем логи PM2
pm2 logs rulplus-app --lines 100

# Проверяем переменные окружения
cat server/.env

# Проверяем подключение к базе данных
cd server && npx prisma db push
```

### Проблемы с Nginx
```bash
# Проверяем конфигурацию
sudo nginx -t

# Перезапускаем Nginx
sudo systemctl restart nginx

# Проверяем статус
sudo systemctl status nginx
```

### Проблемы с SSL
```bash
# Проверяем сертификаты
sudo certbot certificates

# Обновляем сертификаты
sudo certbot renew
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи приложения: `pm2 logs rulplus-app`
2. Проверьте логи Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Проверьте статус служб: `sudo systemctl status nginx postgresql`

## ✅ Проверка развертывания

После завершения развертывания проверьте:

1. ✅ Приложение доступно по HTTPS
2. ✅ База данных подключена
3. ✅ Загрузка файлов работает
4. ✅ Админ-панель доступна
5. ✅ SSL сертификат действительный
6. ✅ Автоматические обновления настроены

🎉 **Приложение РУЛЬ+ успешно развернуто на VPS!**
