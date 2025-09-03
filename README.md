# 🚗 Сайт школы вождения

Одностраничное веб-приложение для автошколы, соответствующее требованиям Рособрнадзора к сайтам образовательных организаций.

## 📋 Описание проекта

Современный сайт автошколы с административной панелью для управления контентом. Включает все обязательные разделы согласно требованиям Рособрнадзора:

- ✅ Основные сведения об организации
- ✅ Структура и органы управления  
- ✅ Документы (устав, лицензии, отчеты)
- ✅ Образовательные программы
- ✅ Педагогический состав
- ✅ Материально-техническое обеспечение
- ✅ Платные образовательные услуги
- ✅ Вакантные места для приема

## ⚙️ Быстрый старт

### 🗄️ Настройка базы данных
Проект использует **PostgreSQL + Prisma** - современную и надежную комбинацию:

```bash
# Настройка базы данных
npm run create-env  # Интерактивная настройка PostgreSQL

# Применение схемы базы данных
npm run db:push     # Применить схему
npm run db:generate # Генерация TypeScript типов

# Работа с данными
npm run db:studio   # Веб-интерфейс для просмотра данных
```

📖 **[Подробная инструкция по настройке PostgreSQL](POSTGRES_MIGRATION.md)**

### 🚀 Запуск проекта

```bash
# 1. Клонирование репозитория
git clone <repository-url>
cd rulplus

# 2. Настройка сервера
cd server
npm run setup
npm run create-env
# Следуйте интерактивным инструкциям для настройки PostgreSQL

# 3. Запуск сервера
npm run dev

# 4. В новом терминале - запуск клиента
cd ../client
npm install
npm run dev
```

## 🛠 Технический стек

### Frontend
- **React 18** + **TypeScript** - основной фреймворк
- **Vite** - быстрая сборка и dev-сервер
- **Material-UI v5** - компоненты и дизайн-система
- **React Router v6** - маршрутизация
- **React Query** - управление серверным состоянием
- **Zustand** - управление клиентским состоянием
- **React Hook Form + Yup** - формы и валидация

### Backend
- **Node.js 18** + **Express** - серверная часть
- **TypeScript** - типизация
- **PostgreSQL + Prisma** 🏆 - база данных и ORM
- **JWT** - аутентификация
- **Multer** - загрузка файлов
- **Winston** - логирование
- **Joi** - валидация данных

### DevOps
- **Docker + Docker Compose** - контейнеризация
- **PostgreSQL** - основная база данных
- **Redis** - кеширование
- **Nginx** - веб-сервер (production)

## 🚀 Быстрый старт

### Требования
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (или Docker)

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd driving-school-website
```

### 2. Установка зависимостей
```bash
# Установка всех зависимостей
npm run install:all

# Или по отдельности
cd client && npm install
cd ../server && npm install
```

### 3. Настройка окружения

#### Backend (.env файл в папке server/)
```env
NODE_ENV=development
PORT=5000
DATABASE_URI=mongodb://localhost:27017/driving_school
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### 4. Запуск в режиме разработки

#### С Docker (рекомендуется)
```bash
# Запуск всех сервисов
docker-compose up -d

# Только база данных
docker-compose up -d mongo redis
```

#### Без Docker
```bash
# Убедитесь что MongoDB запущена локально
# Запуск frontend и backend одновременно
npm run dev

# Или по отдельности
npm run dev:client   # http://localhost:3000
npm run dev:server   # http://localhost:5000
```

## 📁 Структура проекта

```
driving-school-website/
├── client/                 # Frontend приложение
│   ├── src/
│   │   ├── app/           # Конфигурация приложения
│   │   ├── pages/         # Страницы
│   │   ├── widgets/       # Композитные компоненты
│   │   ├── features/      # Фичи приложения
│   │   ├── entities/      # Бизнес-сущности
│   │   └── shared/        # Переиспользуемые компоненты
│   ├── public/
│   └── package.json
├── server/                 # Backend API
│   ├── src/
│   │   ├── config/        # Конфигурация
│   │   ├── controllers/   # Контроллеры
│   │   ├── models/        # Модели данных
│   │   ├── routes/        # Маршруты API
│   │   ├── middleware/    # Промежуточное ПО
│   │   ├── services/      # Бизнес-логика
│   │   └── utils/         # Утилиты
│   ├── uploads/           # Загруженные файлы
│   └── package.json
├── docker/                 # Docker конфигурация
├── docker-compose.yml
├── requirements.md         # Техническое задание
├── design.md              # Архитектурное решение
└── README.md
```

## 🔧 Доступные команды

### Корневые команды
```bash
npm run dev              # Запуск frontend + backend
npm run build            # Сборка для продакшн
npm run test             # Запуск всех тестов
npm run lint             # Проверка кода
npm run type-check       # Проверка типов TypeScript
npm run install:all      # Установка всех зависимостей
npm run clean            # Очистка node_modules и dist
```

### Docker команды
```bash
npm run docker:build     # Сборка Docker образов
npm run docker:up        # Запуск в контейнерах
npm run docker:down      # Остановка контейнеров
```

### Frontend команды
```bash
cd client
npm run dev              # Dev сервер (http://localhost:3000)
npm run build            # Сборка для продакшн
npm run preview          # Предварительный просмотр сборки
npm run test             # Unit тесты
npm run test:e2e         # E2E тесты
npm run lint             # ESLint проверка
npm run format           # Форматирование кода
```

### Backend команды  
```bash
cd server
npm run dev              # Dev сервер (http://localhost:5000)
npm run build            # Сборка TypeScript
npm run start            # Запуск продакшн версии
npm run test             # Unit тесты
npm run db:seed          # Заполнение тестовыми данными
```

## 🌐 API Endpoints

### Публичные API
```
GET  /health                     # Проверка состояния сервера
GET  /api/info/basic            # Основные сведения
GET  /api/info/structure        # Структура организации  
GET  /api/info/documents        # Документы
GET  /api/info/education        # Образовательные программы
GET  /api/info/staff            # Педагогический состав
GET  /api/info/materials        # Материально-техническое обеспечение
GET  /api/info/services         # Платные услуги
GET  /api/info/vacancies        # Вакантные места
GET  /api/news                  # Новости
GET  /api/news/:id              # Конкретная новость
GET  /api/files/:id             # Скачивание файла
```

### Административные API
```
POST /api/auth/login            # Вход в систему
POST /api/auth/logout           # Выход из системы
PUT  /api/admin/info/:section   # Обновление разделов
POST /api/admin/files           # Загрузка файла
DELETE /api/admin/files/:id     # Удаление файла
GET  /api/admin/logs            # Журнал изменений
```

## 📊 Архитектура

Проект использует **Feature-Sliced Design** архитектуру для frontend и **Layered Architecture** для backend:

- **Presentation Layer** - React компоненты и страницы
- **Business Logic Layer** - Кастомные хуки и сервисы  
- **Data Access Layer** - API клиенты и состояние
- **Infrastructure Layer** - Конфигурация и утилиты

## 🔒 Безопасность

- HTTPS обязателен в продакшн
- JWT токены для аутентификации
- Rate limiting для API
- Валидация и санитизация данных
- CORS настройки
- Helmet для безопасности заголовков
- Логирование всех действий

## 📝 Требования Рособрнадзора

Сайт полностью соответствует требованиям к размещению информации об образовательных организациях:

- ✅ Все обязательные разделы реализованы
- ✅ Информация в открытом доступе
- ✅ Возможность обновления данных  
- ✅ Журнал изменений
- ✅ Дата последнего обновления

## 🧪 Тестирование

### Unit тесты
```bash
npm run test              # Все тесты
npm run test:client       # Frontend тесты  
npm run test:server       # Backend тесты
npm run test:coverage     # Покрытие тестами
```

### E2E тесты
```bash
npm run test:e2e          # Playwright тесты
```

## 📦 Развертывание

### Development
```bash
npm run dev
```

### Production с Docker
```bash
# Сборка образов
docker-compose build

# Запуск в продакшн режиме
docker-compose --profile production up -d
```

### Production без Docker
```bash
# Сборка
npm run build

# Запуск
npm run start
```

## 🤝 Команда разработки

- **Frontend Developer** - React, TypeScript, UI/UX
- **Backend Developer** - Node.js, MongoDB, API
- **DevOps Engineer** - Docker, CI/CD, Infrastructure  

## 📄 Лицензия

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [Issues](issues) на GitHub
2. Создайте новый Issue с описанием проблемы
3. Обратитесь к команде разработки

---

**🎯 Проект готов к разработке и соответствует всем современным стандартам веб-разработки!** 