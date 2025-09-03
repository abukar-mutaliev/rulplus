import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Тестируем подключение к PostgreSQL...');

    // Простой запрос для проверки подключения
    await prisma.$queryRaw`SELECT 1 as test`;

    console.log('✅ Подключение к PostgreSQL успешно!');

    // Проверяем, существует ли база данных rulplus_db
    const databases = await prisma.$queryRaw`SELECT datname FROM pg_database WHERE datname = 'rulplus_db'`;

    if (databases.length > 0) {
      console.log('✅ База данных rulplus_db существует');
    } else {
      console.log('❌ База данных rulplus_db не найдена');
      console.log('Создайте базу данных через pgAdmin или выполните:');
      console.log('CREATE DATABASE rulplus_db;');
    }

  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);

    if (error.message.includes('Authentication failed')) {
      console.log('\n🔧 Возможные решения:');
      console.log('1. Проверьте пароль пользователя postgres в pgAdmin');
      console.log('2. Убедитесь, что пользователь postgres имеет права на подключение');
      console.log('3. Попробуйте другой пользователь/пароль');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
