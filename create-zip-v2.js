const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('🚗 РУЛЬ+ - Создание ZIP архива (v2)');

// Проверяем, что папка rulplus-deploy-v2 существует
const deployDir = 'rulplus-deploy-v2';
if (!fs.existsSync(deployDir)) {
    console.error('❌ Папка rulplus-deploy-v2 не найдена!');
    console.log('Сначала запустите: node prepare-shared-hosting-v2.js');
    process.exit(1);
}

// Создаем архив
const output = fs.createWriteStream('rulplus-shared-hosting-v2.zip');
const archive = archiver('zip', {
    zlib: { level: 9 } // Максимальное сжатие
});

output.on('close', () => {
    console.log('✅ ZIP архив создан успешно!');
    console.log('📦 Размер архива:', (archive.pointer() / 1024 / 1024).toFixed(2), 'MB');
    console.log('📁 Файл: rulplus-shared-hosting-v2.zip');
    console.log('');
    console.log('🚀 Готово для загрузки в Менеджер файлов reg.ru!');
    console.log('');
    console.log('📋 Структура архива:');
    console.log('├── index.html          ← В корне хостинга');
    console.log('├── assets/             ← JS и CSS файлы');
    console.log('├── favicon.svg         ← Иконка сайта');
    console.log('├── .htaccess          ← Конфигурация Apache');
    console.log('└── api/               ← API сервер');
});

archive.on('error', (err) => {
    console.error('❌ Ошибка создания архива:', err);
    process.exit(1);
});

archive.pipe(output);

// Добавляем содержимое папки rulplus-deploy-v2
archive.directory(deployDir, false);

// Добавляем инструкции
const instructions = `
# 🚗 РУЛЬ+ - Инструкция по развертыванию (v2)

## 📋 Быстрый старт:

1. **Распакуйте архив** rulplus-shared-hosting-v2.zip
2. **Войдите в Менеджер файлов reg.ru**
3. **Загрузите ВСЕ файлы в корень хостинга** (не в public_html!)

## 📁 Структура архива:

Корень хостинга/
├── index.html          ← Главная страница
├── assets/             ← JS и CSS файлы
├── favicon.svg         ← Иконка сайта
├── .htaccess          ← Конфигурация Apache
└── api/               ← API сервер
    ├── server.js
    ├── package.json
    └── uploads/

## 🌐 Результат:

После развертывания: https://rulplus.ru

**РУЛЬ+ - СЕЛ — ПОЕХАЛ в продакшен! 🚗**
`;

archive.append(instructions, { name: 'README.txt' });

archive.finalize(); 