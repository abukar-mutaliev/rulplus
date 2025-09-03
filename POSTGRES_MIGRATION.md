# 🗄️ Настройка PostgreSQL + Prisma

## 📋 Обзор

Этот документ описывает настройку **PostgreSQL + Prisma** для проекта РУЛЬ+.

## 🎯 Преимущества PostgreSQL + Prisma

### ✅ PostgreSQL
- **Надежность**: ACID транзакции, referential integrity
- **Производительность**: Оптимизированные запросы, индексы
- **SQL стандарты**: Полная поддержка SQL
- **Расширения**: JSONB, массивы, полнотекстовый поиск
- **Масштабируемость**: Лучше подходит для сложных запросов

### ✅ Prisma
- **Type Safety**: Полная типизация TypeScript
- **Migrations**: Автоматическое управление схемой БД
- **ORM**: Удобный API для работы с данными
- **IntelliSense**: Автодополнение в IDE
- **Миграции**: Простое управление изменениями схемы

## 📋 План настройки

### Этап 1: Установка PostgreSQL
```bash
# Windows: Скачать с postgresql.org
# Linux/Mac: sudo apt install postgresql / brew install postgresql

# Создание базы данных
createdb rulplus_db

# Создание пользователя (опционально)
createuser rulplus_user --createdb --password
```

### Этап 2: Настройка переменных окружения
```bash
cd server
npm run create-env  # Интерактивная настройка PostgreSQL
```

### Этап 3: Настройка Prisma
```bash
cd server

# Генерация Prisma клиента
npm run db:generate

# Применение схемы к базе данных
npm run db:push

# Создание и применение миграций (для продакшена)
npm run db:migrate
```

### Этап 4: Тестирование
```bash
# Запуск сервера
npm run dev

# Проверка работы API
curl http://localhost:5000/api/documents

# Открытие Prisma Studio для просмотра данных
npm run db:studio
```

## 🔧 Детальная настройка

### 1. Установка PostgreSQL

#### Windows
```bash
# Скачать PostgreSQL с https://www.postgresql.org/download/windows/
# Следовать инструкциям установщика
# Создать базу данных:
psql -U postgres -c "CREATE DATABASE rulplus_db;"
```

#### Linux (Ubuntu/Debian)
```bash
# Установка
sudo apt update
sudo apt install postgresql postgresql-contrib

# Запуск сервиса
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Создание пользователя и базы данных
sudo -u postgres psql
CREATE USER rulplus_user WITH PASSWORD 'your_password';
CREATE DATABASE rulplus_db OWNER rulplus_user;
GRANT ALL PRIVILEGES ON DATABASE rulplus_db TO rulplus_user;
\q
```

#### Mac
```bash
# Установка через Homebrew
brew install postgresql
brew services start postgresql

# Создание пользователя и базы данных
createdb rulplus_db
```

### 2. Настройка переменных окружения

```env
# server/.env
NODE_ENV=development
PORT=5000

# PostgreSQL подключение
DATABASE_URL=postgresql://username:password@localhost:5432/rulplus_db

# Остальные переменные...
```

### 3. Работа с Prisma

#### Генерация типов
```bash
npm run db:generate
```
Создает TypeScript типы из схемы Prisma

#### Применение схемы
```bash
npm run db:push
```
Применяет схему к базе данных без создания миграций

#### Создание миграций
```bash
npm run db:migrate
```
Создает и применяет миграции (для продакшена)

#### Prisma Studio
```bash
npm run db:studio
```
Открывает веб-интерфейс для просмотра и редактирования данных

## 📋 Seed данные

Для заполнения базы данных тестовыми данными:

```javascript
// В scripts/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание тестового документа
  await prisma.document.create({
    data: {
      title: 'Устав организации',
      description: 'Основной документ организации',
      category: 'charter',
      status: 'active'
    }
  });

  console.log('✅ Тестовые данные созданы');
}

main().catch(console.error);
```

## 📊 Преимущества PostgreSQL + Prisma

| Функция | Преимущества |
|----------|-------------|
| **Типизация** | ✅ Полная TypeScript типизация |
| **ACID** | ✅ Полная поддержка транзакций |
| **Связи** | ✅ Простые отношения между таблицами |
| **Миграции** | ✅ Автоматическое управление схемой |
| **Запросы** | ✅ Оптимизированные SQL запросы |
| **Масштаб** | ✅ Вертикальное масштабирование |
| **JSON** | ✅ Поддержка JSONB полей |
| **Индексы** | ✅ Автоматическая оптимизация |

## 🏗️ Структура проекта после миграции

```
server/
├── prisma/
│   ├── schema.prisma          # Схема базы данных
│   └── migrations/            # Миграции
├── src/
│   ├── config/
│   │   ├── database.js        # Автовыбор БД
│   │   └── prisma.ts          # Prisma клиент
│   ├── services/
│   │   ├── document.service.js       # MongoDB
│   │   └── document.service.prisma.js # PostgreSQL
│   └── routes/
│       └── documents.routes.js       # Автовыбор сервиса
```

## 🧪 Тестирование

### Проверка API
```bash
# Получение документов
curl http://localhost:5000/api/documents

# Создание документа
curl -X POST http://localhost:5000/api/documents \
  -F "title=Тестовый документ" \
  -F "description=Описание" \
  -F "category=charter"

# Обновление документа
curl -X PUT http://localhost:5000/api/documents/{id} \
  -H "Content-Type: application/json" \
  -d '{"title": "Обновленный документ"}'
```

### Проверка базы данных
```bash
# Подключение к PostgreSQL
psql postgresql://username:password@localhost:5432/rulplus_db

# Просмотр таблиц
\d

# Просмотр данных
SELECT * FROM documents LIMIT 5;
```

## 🚨 Возможные проблемы

### 1. Ошибка подключения
```
Error: P1001: Can't reach database server
```
**Решение:**
- Проверьте, что PostgreSQL запущен
- Проверьте DATABASE_URL в .env
- Проверьте права пользователя

### 2. Ошибка миграции
```
Error: P2002: Unique constraint failed
```
**Решение:**
- Проверьте дубликаты в данных
- Очистите базу данных перед миграцией

### 3. Ошибка типов
```
Type 'string' is not assignable to type 'Date'
```
**Решение:**
- Проверьте преобразование дат в миграционном скрипте
- Используйте `new Date()` для строковых дат

## 📚 Полезные команды

```bash
# Просмотр схемы
npx prisma db pull

# Сброс базы данных
npx prisma migrate reset

# Создание seed данных
npx prisma db seed

# Валидация схемы
npx prisma validate

# Форматирование схемы
npx prisma format
```

## 🎯 Следующие шаги

1. **Тестирование**: Полностью протестировать все функции
2. **Оптимизация**: Настроить индексы для часто используемых запросов
3. **Мониторинг**: Настроить логирование запросов к БД
4. **Резервное копирование**: Настроить автоматическое бэкапирование

## 📞 Поддержка

Если возникнут проблемы:
1. Проверьте логи сервера
2. Используйте `npm run db:studio` для просмотра данных
3. Проверьте подключение к PostgreSQL: `psql $DATABASE_URL`

---

**🚗 Удачной миграции на PostgreSQL + Prisma!** 🎉
