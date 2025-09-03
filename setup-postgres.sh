#!/bin/bash

# Скрипт настройки PostgreSQL для РУЛЬ+ приложения

echo "🗄️ Настройка PostgreSQL для РУЛЬ+..."

# Проверяем статус PostgreSQL
echo "📊 Проверяем статус PostgreSQL..."
sudo systemctl status postgresql --no-pager -l

# Подключаемся к PostgreSQL как суперпользователь
echo "🔐 Подключаемся к PostgreSQL..."
sudo -u postgres psql << EOF

-- Создаем базу данных
CREATE DATABASE rulplus_db;
\l

-- Создаем пользователя с паролем
CREATE USER rulplus_user WITH ENCRYPTED PASSWORD 'rulplus_secure_password_2024';
\du

-- Даем права пользователю
GRANT ALL PRIVILEGES ON DATABASE rulplus_db TO rulplus_user;
ALTER USER rulplus_user CREATEDB;

-- Выходим
\q

EOF

echo "✅ База данных и пользователь созданы!"

# Проверяем подключение новым пользователем
echo "🔍 Тестируем подключение..."
PGPASSWORD=rulplus_secure_password_2024 psql -h localhost -U rulplus_user -d rulplus_db -c "SELECT version();"

if [ $? -eq 0 ]; then
    echo "✅ Подключение успешно!"
    echo ""
    echo "📝 Используйте эту DATABASE_URL в вашем .env файле:"
    echo "DATABASE_URL=\"postgresql://rulplus_user:rulplus_secure_password_2024@localhost:5432/rulplus_db\""
else
    echo "❌ Ошибка подключения!"
fi

echo ""
echo "🔧 Дополнительные настройки (опционально):"

# Настраиваем PostgreSQL для удаленного доступа (если нужно)
read -p "Настроить удаленный доступ к PostgreSQL? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Настраиваем удаленный доступ..."

    # Резервная копия конфигурации
    sudo cp /etc/postgresql/16/main/postgresql.conf /etc/postgresql/16/main/postgresql.conf.backup
    sudo cp /etc/postgresql/16/main/pg_hba.conf /etc/postgresql/16/main/pg_hba.conf.backup

    # Разрешаем подключения
    echo "host    all             all             0.0.0.0/0               md5" | sudo tee -a /etc/postgresql/16/main/pg_hba.conf

    # Меняем listen_addresses
    sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/16/main/postgresql.conf

    # Перезапускаем PostgreSQL
    sudo systemctl restart postgresql

    echo "✅ Удаленный доступ настроен!"
fi
