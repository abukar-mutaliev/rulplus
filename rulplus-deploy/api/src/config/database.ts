import mongoose from 'mongoose';
import { config } from './index.js';
import { logger } from '../utils/logger.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.database.uri);
    
    logger.info(`✅ MongoDB подключена: ${connection.connection.host}`);
    
    // Обработка событий подключения
    mongoose.connection.on('error', (error) => {
      logger.error('❌ Ошибка MongoDB:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB отключена');
    });
    
    mongoose.connection.on('reconnected', () => {
      logger.info('🔄 MongoDB переподключена');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('📴 MongoDB соединение закрыто');
    });
    
  } catch (error) {
    logger.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
}; 