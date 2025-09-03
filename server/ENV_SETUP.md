# 🗄️ Настройка PostgreSQL + Переменные окружения

## 📋 Шаг 1: Настройка PostgreSQL

**Рекомендуемый способ: PostgreSQL локально или облачно**

1. Следуйте инструкции: **[POSTGRES_MIGRATION.md](../POSTGRES_MIGRATION.md)**
2. Получите строку подключения к PostgreSQL

## 📋 Шаг 2: Переменные окружения

Создайте файл `.env` в корне директории `server/` со следующим содержимым:

```env
# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration - PostgreSQL + Prisma
DATABASE_URL=postgresql://username:password@localhost:5432/rulplus_db

# JWT Configuration
JWT_SECRET=rulplus_super_secret_jwt_key_change_in_production_2024
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:3007,http://localhost:3008,http://localhost:3009,http://localhost:3010,http://localhost:3011,http://localhost:3012,http://localhost:3013,http://localhost:3014,http://localhost:3015

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DESTINATION=./uploads

# Security Configuration
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=true
LOG_MAX_FILES=14d
LOG_MAX_SIZE=20m

# Email Configuration (для отправки заявок)
EMAIL_USER=your-email@yandex.ru
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.yandex.ru
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_FROM=noreply@rulplus.ru

# Redis Configuration (для кэширования)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Admin Panel Access
ADMIN_PASSWORD=rulplus_admin_2024
```

## 🚀 Быстрый старт

1. **Установите MongoDB** на ваш компьютер
2. **Создайте файл `.env`** в директории `server/`
3. **Скопируйте содержимое** из этого файла
4. **Запустите сервер:**
   ```bash
   cd server
   npm run dev
   ```

## 📊 Проверка подключения

После запуска сервера вы должны увидеть:
```
🚀 Подключение к постоянной MongoDB базе данных...
📍 MongoDB URI: mongodb://localhost:27017/rulplus_driving_school
✅ MongoDB подключена!
📊 Состояние соединения: 1
✅ База данных полностью готова к работе!
```

## 🔧 Настройка MongoDB

### Windows
```bash
# Скачайте и установите MongoDB Community Server
# Запустите MongoDB service или используйте mongod.exe
mongod --dbpath "C:\data\db"
```

### Linux/Mac
```bash
# Установите через Homebrew (Mac)
brew install mongodb-community

# Или через apt (Ubuntu)
sudo apt-get install mongodb

# Запустите
sudo systemctl start mongodb
```

## ⚠️ Важные замечания

- **Не коммитите файл `.env`** в git (он уже в .gitignore)
- **Измените JWT_SECRET** в продакшене
- **Настройте email** для отправки заявок
- **Используйте сильные пароли** для всех сервисов
