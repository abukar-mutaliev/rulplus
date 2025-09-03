import { config } from './index.js';
import { logger } from '../utils/logger.js';

export const connectDatabase = async () => {
  try {
    console.log('🚀 PostgreSQL + Prisma режим');
    console.log(`📍 Database URL: ${config.database.uri.replace(/:[^:]*@/, ':***@')}`);

    // Подключаемся к PostgreSQL через Prisma
    const { prisma } = await import('./prisma.js');
    await prisma.$connect();
    console.log('✅ PostgreSQL подключена через Prisma!');

    // Ждем полной готовности соединения
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Таймаут подключения к базе данных'));
      }, 15000); // Таймаут 15 секунд

      const checkConnection = async () => {
        try {
          // Проверяем соединение простым запросом
          await prisma.$queryRaw`SELECT 1`;
          clearTimeout(timeout);
          console.log('✅ База данных полностью готова к работе!');
          resolve();
        } catch (error) {
          console.log('⏳ Ожидание готовности базы данных...');
          setTimeout(checkConnection, 1000);
        }
      };

      checkConnection();
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('🛑 Завершение работы...');
      const { prisma } = await import('./prisma.js');
      await prisma.$disconnect();
      console.log('📴 PostgreSQL соединение закрыто');
      process.exit(0);
    });

    return true;

  } catch (error) {
    console.error('❌ Ошибка подключения к PostgreSQL:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}; 