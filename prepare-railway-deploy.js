const fs = require('fs');
const path = require('path');

console.log('🚀 Подготовка проекта для развертывания на Railway...');

// Создаем папку для Railway
const railwayDir = 'railway-deploy';
if (fs.existsSync(railwayDir)) {
  fs.rmSync(railwayDir, { recursive: true });
}
fs.mkdirSync(railwayDir, { recursive: true });

// Копируем серверные файлы
console.log('📁 Копирование серверных файлов...');
const serverFiles = [
  'server/src',
  'server/package.json',
  'server/Procfile',
  'railway.json'
];

serverFiles.forEach(file => {
  const sourcePath = path.join(process.cwd(), file);
  const destPath = path.join(railwayDir, file.replace('server/', ''));
  
  if (fs.existsSync(sourcePath)) {
    if (fs.statSync(sourcePath).isDirectory()) {
      // Копируем папку
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      copyDir(sourcePath, destPath);
    } else {
      // Копируем файл
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(sourcePath, destPath);
    }
  }
});

// Создаем .env файл для Railway
console.log('🔧 Создание .env файла...');
const envContent = `EMAIL_USER=amurmutaliev@ya.ru
EMAIL_PASS=mgtqsytszrndfytn
NODE_ENV=production
PORT=3000
`;

fs.writeFileSync(path.join(railwayDir, '.env'), envContent);

// Создаем README для Railway
console.log('📝 Создание README...');
const readmeContent = `# 🚗 РУЛЬ+ - Серверная часть

## 📋 Описание

Серверная часть для сайта автошколы "РУЛЬ+".

## 🚀 Развертывание на Railway

### 1. Зарегистрируйтесь на Railway:
- Перейдите на [railway.app](https://railway.app)
- Войдите через GitHub

### 2. Создайте новый проект:
- Нажмите "New Project"
- Выберите "Deploy from GitHub repo"
- Выберите этот репозиторий

### 3. Настройте переменные окружения:
В Railway Dashboard добавьте:
\`\`\`
EMAIL_USER=amurmutaliev@ya.ru
EMAIL_PASS=mgtqsytszrndfytn
NODE_ENV=production
PORT=3000
\`\`\`

### 4. Получите URL API:
- В Railway Dashboard найдите URL вашего приложения
- Скопируйте URL (например: https://rulplus-api.railway.app)

### 5. Обновите клиент:
В файлах клиента замените все API URL на ваш Railway URL:
- client/src/shared/api/documentsApi.ts
- client/src/shared/api/basicInfo.ts
- client/src/shared/api/servicesApi.ts
- client/src/shared/api/adminStats.ts

### 6. Пересоберите клиент:
\`\`\`bash
cd client
npm run build
cd ..
node prepare-shared-hosting-v2.js
node create-zip-v2.js
\`\`\`

### 7. Загрузите клиент на хостинг

## 📋 API Endpoints

- \`GET /api/health\` - Проверка состояния сервера
- \`POST /api/applications\` - Отправка заявки на обучение
- \`GET /api/documents\` - Получение документов
- \`POST /api/documents\` - Создание документа
- \`PUT /api/documents/:id\` - Обновление документа
- \`DELETE /api/documents/:id\` - Удаление документа
- \`GET /api/services\` - Получение услуг
- \`GET /api/info/basic\` - Основные сведения

## 🎯 Результат

После настройки:
- ✅ Сервер работает на Railway
- ✅ Полная функциональность редактирования
- ✅ SSL сертификат включен
- ✅ Автоматическое развертывание

**РУЛЬ+ - СЕЛ — ПОЕХАЛ с сервером! 🚗**
`;

fs.writeFileSync(path.join(railwayDir, 'README.md'), readmeContent);

// Создаем инструкцию по развертыванию
console.log('📋 Создание инструкции...');
const deployInstructions = `# 🚀 Инструкция по развертыванию на Railway

## 📋 Шаг 1: Подготовка GitHub

### 1.1 Создайте репозиторий на GitHub:
1. Перейдите на [github.com](https://github.com)
2. Создайте новый репозиторий "rulplus-server"
3. Загрузите файлы из папки railway-deploy

### 1.2 Загрузите файлы:
\`\`\`bash
cd railway-deploy
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rulplus-server.git
git push -u origin main
\`\`\`

## 📋 Шаг 2: Настройка Railway

### 2.1 Зарегистрируйтесь на Railway:
1. Перейдите на [railway.app](https://railway.app)
2. Войдите через GitHub
3. Создайте новый проект

### 2.2 Подключите GitHub:
1. Выберите "Deploy from GitHub repo"
2. Выберите ваш репозиторий rulplus-server
3. Railway автоматически развернет сервер

### 2.3 Настройте переменные окружения:
В Railway Dashboard добавьте:
\`\`\`
EMAIL_USER=amurmutaliev@ya.ru
EMAIL_PASS=mgtqsytszrndfytn
NODE_ENV=production
PORT=3000
\`\`\`

## 📋 Шаг 3: Получение URL API

### 3.1 В Railway Dashboard:
1. Откройте ваш проект
2. Найдите URL (например: https://rulplus-api.railway.app)
3. Скопируйте этот URL

## 📋 Шаг 4: Обновление клиента

### 4.1 Обновите API URL в клиенте:
В файле client/src/shared/api/documentsApi.ts:
\`\`\`typescript
const API_BASE_URL = 'https://rulplus-api.railway.app/api';
\`\`\`

### 4.2 Обновите другие файлы:
- client/src/shared/api/basicInfo.ts
- client/src/shared/api/servicesApi.ts
- client/src/shared/api/adminStats.ts

### 4.3 Пересоберите клиент:
\`\`\`bash
cd client
npm run build
cd ..
node prepare-shared-hosting-v2.js
node create-zip-v2.js
\`\`\`

### 4.4 Загрузите на хостинг:
1. Загрузите новый архив на хостинг
2. Проверьте работу сайта

## 🎯 Результат

После настройки:
- ✅ Сервер работает на Railway
- ✅ Полная функциональность редактирования
- ✅ SSL сертификат включен
- ✅ Автоматическое развертывание

**РУЛЬ+ - СЕЛ — ПОЕХАЛ с сервером! 🚗**
`;

fs.writeFileSync(path.join(railwayDir, 'DEPLOY_INSTRUCTIONS.md'), deployInstructions);

console.log('✅ Готово! Файлы для Railway созданы в папке railway-deploy');
console.log('');
console.log('📋 Следующие шаги:');
console.log('1. Создайте репозиторий на GitHub');
console.log('2. Загрузите файлы из папки railway-deploy');
console.log('3. Настройте Railway по инструкции DEPLOY_INSTRUCTIONS.md');
console.log('4. Получите URL API и обновите клиент');

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
} 