const { config } = require('./index.js');
const { logger } = require('../utils/logger.js');

const connectDatabase = async () => {
  try {
    logger.info('🚀 PostgreSQL + Prisma режим');
    logger.info(`📍 Database URL: ${config.database.uri.replace(/:[^:]*@/, ':***@')}`);

    // Подключаемся к PostgreSQL через Prisma
    const { prisma } = require('./prisma.js');
    await prisma.$connect();
    logger.info('✅ PostgreSQL подключена через Prisma!');

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
          logger.info('✅ База данных полностью готова к работе!');
          resolve(true);
        } catch (error) {
          logger.info('⏳ Ожидание готовности базы данных...');
          setTimeout(checkConnection, 1000);
        }
      };

      checkConnection();
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('🛑 Завершение работы...');
      const { prisma } = await import('./prisma.js');
      await prisma.$disconnect();
      logger.info('📴 PostgreSQL соединение закрыто');
      process.exit(0);
    });

  } catch (error) {
    logger.error('❌ Ошибка подключения к PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { connectDatabase }; 