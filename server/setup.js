#!/usr/bin/env node

/**
 * 🛠️ Скрипт настройки сервера РУЛЬ+
 * Автоматически создает необходимые файлы и проверяет конфигурацию
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Настройка сервера РУЛЬ+...\n');

// Создаем необходимые директории
const dirs = ['uploads', 'uploads/documents', 'logs'];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Создана директория: ${dir}`);
  } else {
    console.log(`✅ Директория существует: ${dir}`);
  }
});

// Проверяем наличие .env файла
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '..env');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('\n⚠️  Файл .env не найден!');
    console.log('📋 Скопируйте ..env в .env и настройте переменные окружения');
    console.log('📖 Подробная инструкция: ENV_SETUP.md');
  } else {
    console.log('\n❌ Файлы конфигурации не найдены!');
    console.log('📋 Обратитесь к инструкции в ENV_SETUP.md');
  }
} else {
  console.log('\n✅ Файл .env найден');
}

// Проверяем наличие package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json найден');

  // Читаем package.json для проверки скриптов
  try {
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const scripts = packageData.scripts || {};

    console.log('\n📋 Доступные команды:');
    Object.entries(scripts).forEach(([name, command]) => {
      console.log(`  • npm run ${name}: ${command}`);
    });
  } catch (error) {
    console.log('❌ Ошибка чтения package.json');
  }
} else {
  console.log('\n❌ package.json не найден');
}

console.log('\n🎉 Настройка завершена!');
console.log('🚗 Для запуска сервера выполните: npm run dev');
console.log('📚 Документация: README.md');
console.log('⚙️  Настройки: ENV_SETUP.md\n');
