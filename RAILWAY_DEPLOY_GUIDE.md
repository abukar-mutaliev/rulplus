# 🚀 Развертывание сервера на Railway

## 📋 Что такое Railway?

Railway - это платформа для развертывания приложений, которая:
- ✅ **Бесплатна** для небольших проектов
- ✅ **Поддерживает Node.js**
- ✅ **Автоматическое развертывание** из GitHub
- ✅ **SSL сертификаты** включены
- ✅ **Простая настройка**

## 📋 Шаг 1: Подготовка проекта

### 1.1 Создайте файл `railway.json` в корне проекта:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 1.2 Создайте файл `server/Procfile`:
```
web: npm start
```

### 1.3 Обновите `server/package.json`:
```json
{
  "name": "rulplus-server",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## 📋 Шаг 2: Настройка Railway

### 2.1 Зарегистрируйтесь на Railway:
1. **Перейдите на** [railway.app](https://railway.app)
2. **Войдите через GitHub**
3. **Создайте новый проект**

### 2.2 Подключите GitHub репозиторий:
1. **Выберите "Deploy from GitHub repo"**
2. **Выберите ваш репозиторий**
3. **Выберите папку `server`** как корневую

### 2.3 Настройте переменные окружения:
В Railway Dashboard добавьте:
```
EMAIL_USER=amurmutaliev@ya.ru
EMAIL_PASS=mgtqsytszrndfytn
NODE_ENV=production
PORT=3000
```

## 📋 Шаг 3: Обновление клиента

### 3.1 Обновите API URL в клиенте:
В `client/src/shared/api/documentsApi.ts`:
```typescript
const API_BASE_URL = 'https://your-railway-app.railway.app/api';
```

### 3.2 Обновите другие API файлы:
- `basicInfo.ts`
- `servicesApi.ts`
- `adminStats.ts`

## 📋 Шаг 4: Развертывание

### 4.1 Загрузите код на GitHub:
```bash
git add .
git commit -m "Add Railway deployment"
git push origin main
```

### 4.2 Railway автоматически развернет сервер

### 4.3 Получите URL вашего API:
- В Railway Dashboard найдите URL
- Обновите клиент с новым URL
- Пересоберите и загрузите клиент на хостинг

## 🎯 Результат:

После настройки:
- ✅ **Сервер работает на Railway**
- ✅ **Полная функциональность редактирования**
- ✅ **SSL сертификат включен**
- ✅ **Автоматическое развертывание**

## 📝 Альтернативы:

### Render (бесплатно):
- [render.com](https://render.com)
- Аналогичная настройка

### Vercel (бесплатно):
- [vercel.com](https://vercel.com)
- Отлично для Node.js

### Простой VPS:
- DigitalOcean ($5/месяц)
- Vultr ($2.50/месяц)
- Полный контроль

**РУЛЬ+ - СЕЛ — ПОЕХАЛ с сервером! 🚗** 