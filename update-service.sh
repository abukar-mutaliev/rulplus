#!/bin/bash

# Скрипт автоматического обновления РУЛЬ+ приложения
PROJECT_DIR="/var/www/rulplus"
LOG_FILE="/var/log/rulplus-update.log"

echo "$(date): Начинаем автоматическое обновление" >> $LOG_FILE

cd $PROJECT_DIR

# Получаем последние изменения из репозитория
echo "$(date): Получаем обновления из git" >> $LOG_FILE
git pull origin main >> $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
    echo "$(date): Обновления получены успешно" >> $LOG_FILE

    # Пересобираем приложение
    echo "$(date): Пересобираем клиентскую часть" >> $LOG_FILE
    cd client && npm run build >> $LOG_FILE 2>&1

    echo "$(date): Пересобираем серверную часть" >> $LOG_FILE
    cd ../server && npm run build >> $LOG_FILE 2>&1

    # Копируем клиентские файлы
    echo "$(date): Копируем клиентские файлы" >> $LOG_FILE
    cp -r ../client/dist/* ./public/ >> $LOG_FILE 2>&1

    # Перезапускаем приложение
    echo "$(date): Перезапускаем приложение" >> $LOG_FILE
    pm2 restart rulplus-app >> $LOG_FILE 2>&1

    echo "$(date): Обновление завершено успешно" >> $LOG_FILE
else
    echo "$(date): Ошибка при получении обновлений" >> $LOG_FILE
fi
