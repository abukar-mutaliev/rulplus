#!/bin/bash

# Скрипт исправления аутентификации PostgreSQL

echo "🔧 Исправляем аутентификацию PostgreSQL..."

# Проверяем, установлен ли пароль для пользователя postgres
echo "🔑 Проверяем пользователя postgres..."
sudo -u postgres psql -c "SELECT usename FROM pg_user WHERE usename = 'postgres';"

# Устанавливаем пароль для пользователя postgres (если не установлен)
echo "📝 Устанавливаем пароль для пользователя postgres..."
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres_password_2024';"

# Создаем базу данных rulplus_db
echo "🗄️ Создаем базу данных rulplus_db..."
sudo -u postgres createdb rulplus_db

# Проверяем подключение
echo "🔍 Тестируем подключение..."
PGPASSWORD=postgres_password_2024 psql -h localhost -U postgres -d rulplus_db -c "SELECT version();" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Подключение успешно!"
    echo ""
    echo "📝 DATABASE_URL для .env файла:"
    echo "DATABASE_URL=\"postgresql://postgres:postgres_password_2024@localhost:5432/rulplus_db\""
    echo ""
    echo "📄 Обновите ваш .env файл и попробуйте снова:"
    echo "npx prisma generate && npx prisma db push"
else
    echo "❌ Ошибка подключения. Попробуем другой подход..."

    # Проверяем файл pg_hba.conf
    echo "📋 Проверяем настройки аутентификации..."
    sudo grep -n "local.*postgres" /etc/postgresql/16/main/pg_hba.conf

    # Меняем метод аутентификации для локального подключения
    echo "🔧 Меняем метод аутентификации..."
    sudo sed -i 's/local.*postgres.*peer/local   postgres    trust/' /etc/postgresql/16/main/pg_hba.conf

    # Перезапускаем PostgreSQL
    sudo systemctl restart postgresql

    # Пробуем снова
    sleep 2
    sudo -u postgres psql -c "SELECT version();"

    if [ $? -eq 0 ]; then
        echo "✅ Теперь работает! Установите пароль:"
        sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres_password_2024';"

        # Возвращаем настройки безопасности
        sudo sed -i 's/local.*postgres.*trust/local   postgres    peer/' /etc/postgresql/16/main/pg_hba.conf
        sudo systemctl restart postgresql

        echo ""
        echo "📝 DATABASE_URL:"
        echo "DATABASE_URL=\"postgresql://postgres:postgres_password_2024@localhost:5432/rulplus_db\""
    else
        echo "❌ Все еще проблемы. Давайте создадим нового пользователя..."
        echo "Запустите: ./setup-postgres.sh"
    fi
fi
