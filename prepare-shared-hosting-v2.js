const fs = require('fs');
const path = require('path');

console.log('🚗 РУЛЬ+ - Подготовка для shared hosting (v2)');

// Создаем папку для развертывания
const deployDir = 'rulplus-deploy-v2';

// Очищаем старую папку
if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true });
}

// Создаем структуру папок
fs.mkdirSync(deployDir);
fs.mkdirSync(path.join(deployDir, 'api'));
fs.mkdirSync(path.join(deployDir, 'api', 'uploads'));

console.log('📁 Создана структура папок');

// Копируем собранный фронтенд в корень
const clientDist = path.join('client', 'dist');
if (fs.existsSync(clientDist)) {
    copyDir(clientDist, deployDir);
    console.log('✅ Фронтенд скопирован в корень');
} else {
    console.log('⚠️ Папка client/dist не найдена. Сначала выполните: cd client && npm run build');
}

// Создаем статические JSON файлы для API
console.log('🔧 Создание статических API файлов...');

// Создаем папку для info
fs.mkdirSync(path.join(deployDir, 'api', 'info'), { recursive: true });

// Основные сведения
const basicInfo = {
    "status": "success",
    "data": {
        "fullName": "Автошкола 'РУЛЬ+'",
        "shortName": "РУЛЬ+",
        "brandName": "РУЛЬ+",
        "slogan": "СЕЛ — ПОЕХАЛ!",
        "foundedDate": "2020",
        "legalAddress": "г. Назрань, ул. Московская, 1",
        "actualAddress": "г. Назрань, ул. Московская, 1",
        "phone": "+7 (928) 123-45-67",
        "email": "info@rulplus.ru",
        "website": "https://rulplus.ru",
        "founder": {
            "name": "Иванов Иван Иванович",
            "address": "г. Назрань, ул. Московская, 1",
            "phone": "+7 (928) 123-45-67",
            "email": "founder@rulplus.ru",
            "website": "https://rulplus.ru"
        },
        "management": {
            "director": {
                "name": "Петров Петр Петрович",
                "position": "Директор",
                "phone": "+7 (928) 123-45-67",
                "email": "director@rulplus.ru",
                "workSchedule": "Пн-Пт: 9:00-18:00",
                "receptionHours": "Пн-Пт: 9:00-18:00"
            }
        },
        "workSchedule": {
            "weekdays": "Пн-Пт: 9:00-18:00",
            "saturday": "Сб: 9:00-15:00",
            "sunday": "Вс: выходной",
            "holidays": "По расписанию"
        },
        "branches": [
            {
                "name": "Главный офис",
                "address": "г. Назрань, ул. Московская, 1",
                "phone": "+7 (928) 123-45-67",
                "slogan": "СЕЛ — ПОЕХАЛ!"
            }
        ],
        "description": "Профессиональное обучение вождению автомобиля. Получение водительских прав категорий A, B, C, D.",
        "mission": "Обеспечить качественное обучение вождению и подготовить безопасных водителей",
        "values": [
            "Качество обучения",
            "Безопасность",
            "Профессионализм",
            "Ответственность"
        ],
        "lastUpdated": "2024-01-15"
    }
};

fs.writeFileSync(
    path.join(deployDir, 'api', 'info', 'basic.json'),
    JSON.stringify(basicInfo, null, 2)
);

// Документы
const documents = {
    "status": "success",
    "data": {
        "charter": [
            {
                "id": 1,
                "title": "Устав автошколы 'РУЛЬ+'",
                "name": "Устав автошколы 'РУЛЬ+'",
                "description": "Устав образовательной организации",
                "fileUrl": "/api/uploads/charter.pdf",
                "fileName": "charter.pdf",
                "fileSize": "2.5 МБ",
                "uploadDate": "2024-01-15",
                "category": "charter",
                "status": "active",
                "expiryDate": null
            }
        ],
        "license": [
            {
                "id": 2,
                "title": "Лицензия на образовательную деятельность",
                "name": "Лицензия на образовательную деятельность",
                "description": "Лицензия на право ведения образовательной деятельности",
                "fileUrl": "/api/uploads/license.pdf",
                "fileName": "license.pdf",
                "fileSize": "1.8 МБ",
                "uploadDate": "2024-01-15",
                "category": "license",
                "status": "active",
                "expiryDate": "2025-12-31"
            }
        ],
        "accreditation": [
            {
                "id": 3,
                "title": "Свидетельство о государственной аккредитации",
                "name": "Свидетельство о государственной аккредитации",
                "description": "Свидетельство о государственной аккредитации образовательной организации",
                "fileUrl": "/api/uploads/accreditation.pdf",
                "fileName": "accreditation.pdf",
                "fileSize": "3.2 МБ",
                "uploadDate": "2024-01-15",
                "category": "accreditation",
                "status": "active",
                "expiryDate": "2026-06-30"
            }
        ],
        "regulations": [
            {
                "id": 4,
                "title": "Правила внутреннего распорядка",
                "name": "Правила внутреннего распорядка",
                "description": "Правила внутреннего распорядка обучающихся",
                "fileUrl": "/api/uploads/regulations.pdf",
                "fileName": "regulations.pdf",
                "fileSize": "1.1 МБ",
                "uploadDate": "2024-01-15",
                "category": "regulations",
                "status": "active",
                "expiryDate": null
            }
        ],
        "reports": [
            {
                "id": 5,
                "title": "Отчет о результатах самообследования",
                "name": "Отчет о результатах самообследования",
                "description": "Отчет о результатах самообследования за 2023 год",
                "fileUrl": "/api/uploads/report-2023.pdf",
                "fileName": "report-2023.pdf",
                "fileSize": "4.5 МБ",
                "uploadDate": "2024-01-15",
                "category": "reports",
                "status": "active",
                "expiryDate": null
            }
        ],
        "collective": [
            {
                "id": 6,
                "title": "Коллективный договор",
                "name": "Коллективный договор",
                "description": "Коллективный договор между работодателем и работниками",
                "fileUrl": "/api/uploads/collective.pdf",
                "fileName": "collective.pdf",
                "fileSize": "2.8 МБ",
                "uploadDate": "2024-01-15",
                "category": "collective",
                "status": "active",
                "expiryDate": "2025-12-31"
            }
        ],
        "prescriptions": [],
        "lastUpdated": "2024-01-15"
    }
};

fs.writeFileSync(
    path.join(deployDir, 'api', 'documents.json'),
    JSON.stringify(documents, null, 2)
);

// Услуги
const services = {
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "Обучение категории B",
            "description": "Полный курс обучения вождению автомобиля категории B",
            "price": 25000,
            "duration": "3 месяца",
            "features": [
                "Теоретические занятия",
                "Практические занятия",
                "Экзамен в ГИБДД",
                "Учебные материалы"
            ]
        },
        {
            "id": 2,
            "name": "Обучение категории A",
            "description": "Обучение вождению мотоцикла категории A",
            "price": 15000,
            "duration": "2 месяца",
            "features": [
                "Теоретические занятия",
                "Практические занятия",
                "Экзамен в ГИБДД"
            ]
        }
    ]
};

fs.writeFileSync(
    path.join(deployDir, 'api', 'services.json'),
    JSON.stringify(services, null, 2)
);

console.log('✅ Созданы статические API файлы');

// Создаем .htaccess для правильной структуры
const htaccessContent = `
RewriteEngine On

# API routes - перенаправляем на JSON файлы
RewriteRule ^api/info/basic$ api/info/basic.json [QSA,L]
RewriteRule ^api/documents$ api/documents.json [QSA,L]
RewriteRule ^api/services$ api/services.json [QSA,L]

# React routes - все остальное на index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]

# Security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"

# Cache static assets
<FilesMatch "\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>
`;

fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccessContent);
console.log('✅ Создан .htaccess');

// Создаем инструкцию по развертыванию
const deployInstructions = `# 🚗 РУЛЬ+ - Инструкция по развертыванию (v2)

## 📁 Структура файлов:

Корень хостинга/
├── index.html          ← Главная страница
├── assets/             ← JS и CSS файлы
├── favicon.svg         ← Иконка сайта
├── .htaccess          ← Конфигурация Apache
└── api/               ← Статические API файлы
    ├── info/
    │   └── basic.json ← Основные сведения
    ├── documents.json ← Документы
    └── services.json  ← Услуги

## 📋 Пошаговая инструкция:

### 1. Загрузите файлы в корень хостинга:
- Выделите ВСЕ файлы из этой папки
- Загрузите их в корень хостинга (не в public_html!)
- Убедитесь, что index.html находится в корне

### 2. Проверьте работу:
- Откройте https://rulplus.ru
- Проверьте загрузку основных сведений
- Проверьте загрузку документов
- Проверьте загрузку услуг

## 🎯 Результат:
- 🌐 https://rulplus.ru - работает
- 📧 Форма заявок - отправляется
- 📱 Адаптивный дизайн - работает
- 📄 API данные - загружаются из JSON файлов

**РУЛЬ+ - СЕЛ — ПОЕХАЛ! 🚗**
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOY_INSTRUCTIONS.md'), deployInstructions);
console.log('✅ Создана инструкция по развертыванию');

console.log('');
console.log('🎉 Подготовка завершена!');
console.log(`📁 Файлы готовы в папке: ${deployDir}/`);
console.log(`📖 Инструкция: ${deployDir}/DEPLOY_INSTRUCTIONS.md`);

// Функция для копирования папок
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
} 