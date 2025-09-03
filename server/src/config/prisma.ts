import { PrismaClient } from '@prisma/client';

// Создаем экземпляр Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Обработка graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };