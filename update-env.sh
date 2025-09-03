#!/bin/bash

# Скрипт обновления .env файла для PostgreSQL

echo "📝 Обновляем .env файл для PostgreSQL..."

# Проверяем, существует ли .env файл
if [ ! -f ".env" ]; then
    echo "❌ Файл .env не найден!"
    exit 1
fi

# Создаем резервную копию
cp .env .env.backup
echo "✅ Резервная копия создана: .env.backup"

# Обновляем DATABASE_URL
echo "🔧 Обновляем DATABASE_URL..."

# Вариант 1: Использовать существующего пользователя postgres
read -p "Использовать пользователя postgres? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    sed -i 's|DATABASE_URL=.*|DATABASE_URL="postgresql://postgres:postgres_password_2024@localhost:5432/rulplus_db"|' .env
    echo "✅ Обновлено для пользователя postgres"
else
    # Вариант 2: Использовать нового пользователя
    sed -i 's|DATABASE_URL=.*|DATABASE_URL="postgresql://rulplus_user:rulplus_secure_password_2024@localhost:5432/rulplus_db"|' .env
    echo "✅ Обновлено для пользователя rulplus_user"
fi

echo ""
echo "📋 Текущая конфигурация:"
grep DATABASE_URL .env

echo ""
echo "🧪 Тестируем подключение..."
npx prisma db push 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Подключение успешно!"
    echo "🎉 Теперь можно запускать приложение!"
else
    echo "❌ Ошибка подключения. Проверьте настройки PostgreSQL."
    echo "💡 Попробуйте запустить: ./setup-postgres.sh"
fi
