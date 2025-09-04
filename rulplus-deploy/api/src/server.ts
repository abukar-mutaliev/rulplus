import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

const app = express();

// Базовые middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3007', 'http://localhost:3008', 'http://localhost:3009', 'http://localhost:3010', 'http://localhost:3011', 'http://localhost:3012'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Базовый API endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Driving School API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});

// Временный endpoint для основных сведений
app.get('/api/info/basic', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      fullName: 'Общество с ограниченной ответственностью "Автошкола Руль+"',
      shortName: 'ООО "Автошкола Руль+"',
      foundedDate: '1 августа 2025 года',
      legalAddress: 'г. Назрань, пр-т. И. Базоркина, д. 28 В',
      actualAddress: 'г. Назрань, пр-т. И. Базоркина, д. 28 В',
      phone: '+7 (988) 822-28-88',
      email: 'rulplus@mail.ru',
      website: 'https://driving-school.ru',
      workSchedule: {
        weekdays: 'Понедельник - Пятница: 09:00 - 18:00',
        saturday: 'Суббота: 10:00 - 16:00',
        sunday: 'Воскресенье: выходной',
        holidays: 'В праздничные дни по отдельному графику'
      },
      lastUpdated: new Date().toISOString()
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Маршрут ${req.originalUrl} не найден на этом сервере`,
    code: 'ROUTE_NOT_FOUND',
  });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Ошибка сервера:', error);
  
  res.status(error.statusCode || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Внутренняя ошибка сервера' 
      : error.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🌍 Режим: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API endpoints:`);
  console.log(`   - Health check: http://localhost:${PORT}/health`);
  console.log(`   - Basic info: http://localhost:${PORT}/api/info/basic`);
  console.log(`   - Main API: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM сигнал получен');
  server.close(() => {
    console.log('Процесс завершен');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT сигнал получен');
  server.close(() => {
    console.log('Процесс завершен');
    process.exit(0);
  });
});

export default app; 