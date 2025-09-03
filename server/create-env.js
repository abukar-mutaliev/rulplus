#!/usr/bin/env node

/**
 * 🚀 Скрипт создания файла .env для РУЛЬ+
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createEnvFile() {
  console.log('🚀 Создание файла .env для РУЛЬ+\n');

  // Проверяем, существует ли уже .env файл
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const overwrite = await askQuestion('Файл .env уже существует. Перезаписать? (y/n): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Операция отменена');
      rl.close();
      return;
    }
  }

  console.log('📋 Настройка PostgreSQL + Prisma базы данных');
  console.log('🏆 PostgreSQL - оптимальный выбор для продакшена!');
  console.log('');
  console.log('📋 Вам потребуется:');
  console.log('   • PostgreSQL сервер (локальный или облачный)');
  console.log('   • Созданная база данных rulplus_db');
  console.log('   • Права на создание таблиц');
  console.log('');

  const pgHost = await askQuestion('Хост PostgreSQL (localhost): ') || 'localhost';
  const pgPort = await askQuestion('Порт PostgreSQL (5432): ') || '5432';
  const pgUser = await askQuestion('Имя пользователя: ');
  const pgPass = await askQuestion('Пароль: ');
  const pgDb = await askQuestion('Имя базы данных (rulplus_db): ') || 'rulplus_db';

  const databaseUrl = `postgresql://${pgUser}:${pgPass}@${pgHost}:${pgPort}/${pgDb}`;
  console.log('✅ PostgreSQL URL создан');

  // Создаем содержимое .env файла
  const envContent = `# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DATABASE_URL=${databaseUrl}

# JWT Configuration
JWT_SECRET=rulplus_super_secret_jwt_key_${Date.now()}
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

# ============================================
# Файл создан: ${new Date().toISOString()}
# ============================================
`;

  // Записываем файл
  try {
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('\n✅ Файл .env успешно создан!');
    console.log(`📁 Путь: ${envPath}`);
    console.log('\n🚀 Теперь можно запустить сервер:');
    console.log('npm run dev');

    if (choice === '3') {
      console.log('\n⚠️  ВНИМАНИЕ: Используются демо-настройки!');
      console.log('Данные НЕ будут сохраняться между перезапусками сервера.');
      console.log('Для продакшена настройте MongoDB Atlas или локальную MongoDB.');
    }
  } catch (error) {
    console.error('\n❌ Ошибка создания файла .env:', error.message);
  }

  rl.close();
}

createEnvFile().catch(console.error);
