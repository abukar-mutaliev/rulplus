import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Установка значений по умолчанию
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // Логирование ошибки
  logger.error('Ошибка приложения:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Ответ в зависимости от окружения
  if (process.env.NODE_ENV === 'production') {
    // Продакшн - скрываем детали ошибок
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Что-то пошло не так',
      });
    }
  } else {
    // Разработка - показываем все детали
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};

// Обработчик для необработанных промисов
export const handleUnhandledRejection = () => {
  process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
    logger.error('Необработанный rejection:', { reason, promise });
    process.exit(1);
  });
};

// Обработчик для необработанных исключений
export const handleUncaughtException = () => {
  process.on('uncaughtException', (error: Error) => {
    logger.error('Необработанное исключение:', error);
    process.exit(1);
  });
}; 