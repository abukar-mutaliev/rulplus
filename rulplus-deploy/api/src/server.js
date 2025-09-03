import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Импорт маршрутов
import adminStatsRoutes from './routes/admin/adminStats.routes.js';
import applicationRoutes from './routes/application.routes.js';

// Загрузка переменных окружения
dotenv.config();

// Логируем переменные окружения при запуске сервера
console.log('🔧 Server startup - Environment variables:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Базовые middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3007', 'http://localhost:3008', 'http://localhost:3009', 'http://localhost:3010', 'http://localhost:3011', 'http://localhost:3012', 'http://localhost:3013', 'http://localhost:3014', 'http://localhost:3015'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Создаем директорию для документов, если она не существует
const documentsDir = path.join(process.cwd(), 'uploads', 'documents');
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir, { recursive: true });
}

// Конфигурация для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentsDir);
  },
  filename: (req, file, cb) => {
    // Создаем безопасное имя файла без пробелов и специальных символов
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9а-яА-Я]/g, '_') // Заменяем все небезопасные символы на подчеркивания
      .replace(/_+/g, '_') // Заменяем множественные подчеркивания на одинарные
      .replace(/^_|_$/g, ''); // Убираем подчеркивания в начале и конце
    const safeFileName = `${name}_${timestamp}${ext}`;
    cb(null, safeFileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB максимум
  },
  fileFilter: (req, file, cb) => {
    // Разрешенные типы файлов
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только файлы PDF, DOC, DOCX, TXT'));
    }
  }
});

// Простое хранилище документов в памяти (в реальном проекте используйте базу данных)
let documentsStore = {
  charter: [],
  license: [],
  accreditation: [
    {
      id: 1000000, // Большой ID чтобы не конфликтовать с реальными
      title: 'Свидетельство о государственной аккредитации',
      description: 'Для программ профессионального обучения государственная аккредитация не предусмотрена',
      uploadDate: '2024-01-01',
      lastUpdate: '2024-01-01',
      status: 'not_required'
    }
  ],
  regulations: [],
  reports: [],
  collective: [],
  prescriptions: []
};

// Хранилище услуг в памяти
let servicesStore = {
  mainServices: [
    {
      id: 1,
      category: 'B',
      name: 'Профессиональная подготовка водителей категории "B"',
      description: 'Полный курс обучения вождению легкового автомобиля',
      duration: '2-3 месяца',
      cost: 35000,
      includes: [
        'Теоретические занятия (130 академических часов)',
        'Практические занятия (56 академических часов)',
        'Учебные материалы',
        'Внутренний экзамен',
        'Сопровождение при сдаче экзамена в ГИБДД'
      ],
      additionalCosts: [
        { service: 'Медицинская справка', cost: 'от 2000', note: 'оплачивается отдельно' },
        { service: 'Госпошлина ГИБДД', cost: '2000', note: 'оплачивается отдельно' }
      ]
    },
    {
      id: 2,
      category: 'A',
      name: 'Профессиональная подготовка водителей категории "A"',
      description: 'Полный курс обучения управлению мотоциклом',
      duration: '1.5-2 месяца',
      cost: 25000,
      includes: [
        'Теоретические занятия (108 академических часов)',
        'Практические занятия (18 академических часов)',
        'Учебные материалы',
        'Внутренний экзамен',
        'Сопровождение при сдаче экзамена в ГИБДД'
      ],
      additionalCosts: [
        { service: 'Медицинская справка', cost: 'от 2500', note: 'оплачивается отдельно' },
        { service: 'Госпошлина ГИБДД', cost: '2000', note: 'оплачивается отдельно' }
      ]
    },
    {
      id: 3,
      category: 'C',
      name: 'Профессиональная подготовка водителей категории "C"',
      description: 'Полный курс обучения управлению грузовым автомобилем',
      duration: '3-4 месяца',
      cost: 45000,
      includes: [
        'Теоретические занятия (162 академических часа)',
        'Практические занятия (84 академических часа)',
        'Учебные материалы',
        'Внутренний экзамен',
        'Сопровождение при сдаче экзамена в ГИБДД'
      ],
      additionalCosts: [
        { service: 'Медицинская справка', cost: 'от 3000', note: 'оплачивается отдельно' },
        { service: 'Госпошлина ГИБДД', cost: '2000', note: 'оплачивается отдельно' }
      ]
    }
  ],
  additionalServices: [
    {
      id: 4,
      name: 'Дополнительные практические занятия',
      description: 'Индивидуальные занятия с инструктором',
      cost: 1500,
      unit: 'за академический час',
      note: 'При необходимости дополнительной отработки навыков'
    },
    {
      id: 5,
      name: 'Повторная сдача внутреннего экзамена',
      description: 'Пересдача теоретического или практического экзамена',
      cost: 1000,
      unit: 'за попытку',
      note: 'В случае неудачной первой попытки'
    },
    {
      id: 6,
      name: 'Сопровождение на экзамен в ГИБДД (повторное)',
      description: 'Повторное сопровождение при пересдаче в ГИБДД',
      cost: 2000,
      unit: 'за поездку',
      note: 'При неудачной сдаче экзамена в ГИБДД'
    },
    {
      id: 7,
      name: 'Ускоренный курс обучения',
      description: 'Интенсивная программа обучения',
      cost: 5000,
      unit: 'доплата к основной стоимости',
      note: 'Сокращение срока обучения в 1.5 раза'
    }
  ],
  paymentTerms: {
    methods: [
      { id: 1, method: 'Наличными в кассе организации' },
      { id: 2, method: 'Банковской картой' },
      { id: 3, method: 'Банковским переводом' },
      { id: 4, method: 'Через систему "Сбербанк Онлайн"' },
      { id: 5, method: 'Через терминалы оплаты' }
    ],
    schedule: [
      { id: 1, stage: 'При заключении договора', amount: '50%', note: 'от общей стоимости' },
      { id: 2, stage: 'Перед началом практических занятий', amount: '30%', note: 'от общей стоимости' },
      { id: 3, stage: 'Перед внутренним экзаменом', amount: '20%', note: 'от общей стоимости' }
    ],
    discounts: [
      { id: 1, category: 'Студенты очных отделений', discount: '10%', note: 'при предъявлении студенческого билета' },
      { id: 2, category: 'Пенсионеры', discount: '5%', note: 'при предъявлении пенсионного удостоверения' },
      { id: 3, category: 'Многодетные семьи', discount: '15%', note: 'при предъявлении соответствующих документов' },
      { id: 4, category: 'Обучение второй категории', discount: '20%', note: 'при наличии водительского удостоверения' }
    ]
  },
  contractInfo: {
    templateUrl: '/documents/contract-template.pdf',
    requiredDocuments: [
      'Паспорт гражданина РФ',
      'Медицинская справка установленного образца',
      'Фотографии 3x4 см (2 шт.)',
      'Водительское удостоверение (при обучении на категорию выше имеющейся)'
    ]
  }
};

// Функция для исправления имен файлов
const sanitizeFileName = (filename) => {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext)
    .replace(/[^a-zA-Z0-9а-яА-Я]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return `${name}${ext}`;
};

// Функция для проверки и загрузки существующих файлов при старте сервера
const loadExistingFiles = () => {
  try {
    const files = fs.readdirSync(documentsDir);
    console.log(`📁 Найдено ${files.length} файлов в папке documents:`);
    
    files.forEach((filename, index) => {
      const filePath = path.join(documentsDir, filename);
      const stats = fs.statSync(filePath);
      
      // Создаем безопасное имя файла
      const safeFileName = sanitizeFileName(filename);
      const safeFilePath = path.join(documentsDir, safeFileName);
      
      // Если имя файла изменилось, переименовываем файл
      if (filename !== safeFileName && !fs.existsSync(safeFilePath)) {
        try {
          fs.renameSync(filePath, safeFilePath);
          console.log(`📝 Переименован файл: ${filename} → ${safeFileName}`);
          filename = safeFileName; // Обновляем имя для дальнейшего использования
        } catch (error) {
          console.error(`❌ Ошибка переименования файла ${filename}:`, error.message);
        }
      }
      
      // Определяем категорию по расширению или создаем общую категорию
      let category = 'charter'; // По умолчанию
      if (filename.toLowerCase().includes('license') || filename.toLowerCase().includes('лицензи')) {
        category = 'license';
      } else if (filename.toLowerCase().includes('report') || filename.toLowerCase().includes('отчет')) {
        category = 'reports';
      } else if (filename.toLowerCase().includes('regulation') || filename.toLowerCase().includes('правил')) {
        category = 'regulations';
      }
      
      // Добавляем файл в соответствующую категорию
      const document = {
        id: Date.now() + index, // Уникальный ID
        title: `Документ: ${path.basename(filename, path.extname(filename))}`,
        description: `Загружен: ${filename}`,
        category: category,
        fileUrl: `/documents/${filename}`,
        fileName: filename,
        fileSize: `${(stats.size / 1024 / 1024).toFixed(1)} МБ`,
        uploadDate: stats.birthtime.toISOString().split('T')[0],
        lastUpdate: stats.mtime.toISOString().split('T')[0],
        status: 'active'
      };
      
      if (!documentsStore[category]) {
        documentsStore[category] = [];
      }
      documentsStore[category].push(document);
      
      console.log(`📄 Загружен документ: ${document.title} (${category}) - ${document.fileSize}`);
    });
  } catch (error) {
    console.error('❌ Ошибка загрузки существующих файлов:', error.message);
  }
};

// Загружаем существующие файлы при старте сервера
loadExistingFiles();

// Статические файлы с правильными MIME типами
app.use('/uploads', express.static('uploads', {
  setHeaders: (res, path) => {
    if (path.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
    } else if (path.endsWith('.doc')) {
      res.setHeader('Content-Type', 'application/msword');
    } else if (path.endsWith('.docx')) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    } else if (path.endsWith('.txt')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    // Разрешаем встраивание в iframe для просмотра
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  }
}));

app.use('/documents', express.static('uploads/documents', {
  setHeaders: (res, path) => {
    if (path.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline'); // Открывать в браузере, а не скачивать
    } else if (path.endsWith('.doc')) {
      res.setHeader('Content-Type', 'application/msword');
    } else if (path.endsWith('.docx')) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    } else if (path.endsWith('.txt')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }
    // Разрешаем встраивание в iframe для просмотра
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // CORS заголовки для файлов
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Базовый API endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'РУЛЬ+ API - СЕЛ - ПОЕХАЛ!',
    version: '1.0.0',
    status: 'running',
    brand: 'РУЛЬ+',
    slogan: 'СЕЛ — ПОЕХАЛ',
    endpoints: {
      health: '/health',
      api: '/api',
      basicInfo: '/api/info/basic',
      staff: '/api/info/staff',
      documents: '/api/documents',
    },
  });
});

// API для основных сведений
app.get('/api/info/basic', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      fullName: 'Общество с ограниченной ответственностью "РУЛЬ+"',
      shortName: 'ООО "РУЛЬ+"',
      brandName: 'РУЛЬ+',
      slogan: 'СЕЛ — ПОЕХАЛ',
      foundedDate: '15 марта 2010 года',
      legalAddress: '123456, г. Москва, ул. Примерная, д. 123, оф. 45',
      actualAddress: '123456, г. Москва, ул. Примерная, д. 123, оф. 45',
      phone: '+7 (495) 123-45-67',
      email: 'info@rulplus.ru',
      website: 'https://rulplus.ru',
      founder: {
        name: 'Департамент образования и науки города Москвы',
        address: '125032, г. Москва, ул. Тверская, д. 13',
        phone: '+7 (495) 777-77-77',
        email: 'info@educom.mos.ru',
        website: 'https://www.mos.ru/donm/'
      },
      management: {
        director: {
          name: 'Муталиев Амурклан Ибрагимович',
          position: 'Директор',
          phone: '+79286970697',
          email: 'amurklan@mail.ru',
          workSchedule: 'Понедельник - Пятница: 09:00 - 18:00',
          receptionHours: 'Среда: 14:00 - 17:00 (по предварительной записи)'
        }
      },
      workSchedule: {
        weekdays: 'Понедельник - Пятница: 09:00 - 18:00',
        saturday: 'Суббота: 10:00 - 16:00',
        sunday: 'Воскресенье: выходной',
        holidays: 'В праздничные дни по отдельному графику'
      },
      branches: [
        {
          name: 'Филиал "РУЛЬ+ Северный"',
          address: '127015, г. Москва, ул. Северная, д. 45',
          phone: '+7 (495) 123-45-68',
          slogan: 'СЕЛ — ПОЕХАЛ по-северному!'
        },
        {
          name: 'Филиал "РУЛЬ+ Южный"',
          address: '115551, г. Москва, ул. Южная, д. 78',
          phone: '+7 (495) 123-45-69',
          slogan: 'СЕЛ — ПОЕХАЛ по-южному!'
        }
      ],
      description: 'РУЛЬ+ - автошкола нового поколения! Современные методики обучения, профессиональные инструкторы и 95% наших учеников сдают экзамен с первого раза.',
      mission: 'Научить каждого ученика безопасному и уверенному вождению, используя инновационные подходы и индивидуальный подход.',
      values: [
        'Безопасность превыше всего',
        'Индивидуальный подход к каждому',
        'Современные технологии обучения',
        'Профессионализм инструкторов',
        'Честность и открытость'
      ],
      lastUpdated: new Date().toISOString()
    }
  });
});

// API для педагогического состава
app.get('/api/info/staff', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      totalCount: 12,
      description: 'Команда профессионалов РУЛЬ+ - опытные инструкторы и преподаватели, которые помогут вам освоить искусство вождения по принципу "СЕЛ — ПОЕХАЛ"!',
      categories: [
        {
          name: 'Преподаватели теоретических дисциплин',
          count: 5,
          staff: [
            {
              id: 1,
              name: 'Иванов Петр Сергеевич',
              position: 'Ведущий преподаватель теории РУЛЬ+',
              education: 'Высшее педагогическое (МГПУ)',
              experience: 15,
              qualificationCategory: 'Высшая',
              subjects: ['Правила дорожного движения', 'Основы законодательства', 'Психология вождения', 'Методика "СЕЛ — ПОЕХАЛ"'],
              vehicleTypes: [],
              email: 'ivanov@rulplus.ru',
              phone: '+7 (495) 123-45-70',
              achievements: ['Лучший преподаватель года 2023', 'Автор методики быстрого запоминания ПДД']
            },
            {
              id: 2,
              name: 'Петрова Анна Михайловна',
              position: 'Преподаватель теории и технологий',
              education: 'Высшее техническое (МАДИ)',
              experience: 12,
              qualificationCategory: 'Первая',
              subjects: ['Устройство автомобиля', 'Техническое обслуживание', 'Современные системы безопасности'],
              vehicleTypes: [],
              email: 'petrova@rulplus.ru',
              phone: '+7 (495) 123-45-71',
              achievements: ['Специалист по современным автомобильным технологиям']
            }
          ]
        },
        {
          name: 'Мастера производственного обучения',
          count: 7,
          staff: [
            {
              id: 3,
              name: 'Сидоров Алексей Владимирович',
              position: 'Ведущий инструктор категории B',
              education: 'Среднее специальное (Автомеханический колледж)',
              experience: 20,
              qualificationCategory: 'Высшая',
              subjects: ['Практическое вождение категории B', 'Экстремальное вождение'],
              vehicleTypes: ['Легковые автомобили с МКПП', 'Легковые автомобили с АКПП'],
              email: 'sidorov@rulplus.ru',
              phone: '+7 (495) 123-45-72',
              achievements: ['Мастер спорта по автомобильному спорту', 'Инструктор года 2022-2023']
            },
            {
              id: 4,
              name: 'Козлов Дмитрий Александрович',
              position: 'Мастер производственного обучения категории C',
              education: 'Среднее специальное (Транспортный техникум)',
              experience: 18,
              qualificationCategory: 'Первая',
              subjects: ['Практическое вождение категории C', 'Безопасность грузоперевозок'],
              vehicleTypes: ['Грузовые автомобили до 7.5т', 'Грузовые автомобили свыше 7.5т'],
              email: 'kozlov@rulplus.ru',
              phone: '+7 (495) 123-45-73',
              achievements: ['Водитель-миллионник', '15 лет без нарушений ПДД']
            }
          ]
        }
      ],
      qualificationRequirements: [
        'Высшее или среднее профессиональное образование',
        'Стаж работы в сфере автомобильного транспорта не менее 3 лет',
        'Действующее водительское удостоверение соответствующей категории',
        'Прохождение курсов повышения квалификации каждые 5 лет',
        'Медицинская справка о пригодности к управлению ТС',
        'Знание современных методик обучения вождению',
        'Приверженность философии РУЛЬ+: "СЕЛ — ПОЕХАЛ"'
      ],
      trainingPrograms: [
        'Ежемесячные тренинги по новым методикам обучения',
        'Курсы по работе с современным автомобильным оборудованием',
        'Психологические тренинги для работы с учениками',
        'Семинары по изменениям в ПДД и законодательстве'
      ],
      lastUpdated: new Date().toISOString()
    }
  });
});

// API для документов
app.get('/api/documents', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      ...documentsStore,
      lastUpdated: new Date().toISOString()
    }
  });
});

// Загрузка нового документа
app.post('/api/documents', upload.single('file'), (req, res) => {
  try {
    const { title, description, category, status, expiryDate } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Требуются поля: title, description, category'
      });
    }

    const newDocument = {
      id: Date.now(),
      title,
      description,
      category,
      status: status || 'active',
      uploadDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      ...(expiryDate && { expiryDate })
    };

    // Если файл был загружен
    if (req.file) {
      newDocument.fileUrl = `/documents/${req.file.filename}`;
      newDocument.fileName = req.file.filename;
      newDocument.fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} МБ`;
    }

    // Добавляем документ в соответствующую категорию
    if (!documentsStore[category]) {
      documentsStore[category] = [];
    }
    documentsStore[category].push(newDocument);

    console.log(`📄 Новый документ добавлен: ${title} (${category})`);

    res.status(201).json({
      status: 'success',
      message: 'Документ успешно загружен',
      data: newDocument
    });

  } catch (error) {
    console.error('Ошибка загрузки документа:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка загрузки документа',
      error: error.message
    });
  }
});

// Обновление документа
app.put('/api/documents/:id', upload.single('file'), (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const { title, description, category, status, expiryDate } = req.body;
    
    // Ищем документ во всех категориях
    let foundDocument = null;
    let foundCategory = null;
    
    for (const [catKey, documents] of Object.entries(documentsStore)) {
      const docIndex = documents.findIndex(doc => doc.id === documentId);
      if (docIndex !== -1) {
        foundDocument = documents[docIndex];
        foundCategory = catKey;
        break;
      }
    }

    if (!foundDocument) {
      return res.status(404).json({
        status: 'error',
        message: 'Документ не найден'
      });
    }

    // Обновляем данные документа
    if (title) foundDocument.title = title;
    if (description) foundDocument.description = description;
    if (status) foundDocument.status = status;
    if (expiryDate !== undefined) foundDocument.expiryDate = expiryDate;
    foundDocument.lastUpdate = new Date().toISOString().split('T')[0];

    // Если загружен новый файл
    if (req.file) {
      // Удаляем старый файл, если он есть
      if (foundDocument.fileName) {
        const oldFilePath = path.join(documentsDir, foundDocument.fileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
      foundDocument.fileUrl = `/documents/${req.file.filename}`;
      foundDocument.fileName = req.file.filename;
      foundDocument.fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} МБ`;
    }

    // Если изменилась категория, перемещаем документ
    if (category && category !== foundCategory) {
      // Удаляем из старой категории
      documentsStore[foundCategory] = documentsStore[foundCategory].filter(doc => doc.id !== documentId);
      
      // Добавляем в новую категорию
      if (!documentsStore[category]) {
        documentsStore[category] = [];
      }
      documentsStore[category].push(foundDocument);
    }

    console.log(`📝 Документ обновлен: ${foundDocument.title}`);

    res.json({
      status: 'success',
      message: 'Документ успешно обновлен',
      data: foundDocument
    });

  } catch (error) {
    console.error('Ошибка обновления документа:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления документа',
      error: error.message
    });
  }
});

// Удаление документа
app.delete('/api/documents/:id', (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    
    // Ищем документ во всех категориях
    let foundDocument = null;
    let foundCategory = null;
    
    for (const [catKey, documents] of Object.entries(documentsStore)) {
      const docIndex = documents.findIndex(doc => doc.id === documentId);
      if (docIndex !== -1) {
        foundDocument = documents[docIndex];
        foundCategory = catKey;
        // Удаляем из массива
        documentsStore[catKey].splice(docIndex, 1);
        break;
      }
    }

    if (!foundDocument) {
      return res.status(404).json({
        status: 'error',
        message: 'Документ не найден'
      });
    }

    // Удаляем файл с диска, если он есть
    if (foundDocument.fileName) {
      const filePath = path.join(documentsDir, foundDocument.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Файл удален: ${foundDocument.fileName}`);
      }
    }

    console.log(`🗑️ Документ удален: ${foundDocument.title}`);

    res.json({
      status: 'success',
      message: 'Документ успешно удален'
    });

  } catch (error) {
    console.error('Ошибка удаления документа:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка удаления документа',
      error: error.message
    });
  }
});

// ===== API УСЛУГ =====

// Получить все услуги
app.get('/api/services', (req, res) => {
  try {
    res.json(servicesStore);
  } catch (error) {
    console.error('Ошибка получения услуг:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка получения услуг',
      error: error.message
    });
  }
});

// Создать основную услугу
app.post('/api/services/main', (req, res) => {
  try {
    const { category, name, description, duration, cost, includes, additionalCosts } = req.body;
    
    const newService = {
      id: Date.now(),
      category,
      name,
      description,
      duration,
      cost: parseInt(cost),
      includes: includes.filter(item => item.trim() !== ''),
      additionalCosts: additionalCosts.filter(item => item.service.trim() !== '')
    };

    servicesStore.mainServices.push(newService);
    
    console.log(`✅ Основная услуга создана: ${newService.name}`);
    
    res.json({
      status: 'success',
      message: 'Основная услуга успешно создана',
      data: newService
    });
  } catch (error) {
    console.error('Ошибка создания основной услуги:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка создания основной услуги',
      error: error.message
    });
  }
});

// Обновить основную услугу
app.put('/api/services/main/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { category, name, description, duration, cost, includes, additionalCosts } = req.body;
    
    const serviceIndex = servicesStore.mainServices.findIndex(service => service.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Услуга не найдена'
      });
    }

    servicesStore.mainServices[serviceIndex] = {
      ...servicesStore.mainServices[serviceIndex],
      category,
      name,
      description,
      duration,
      cost: parseInt(cost),
      includes: includes.filter(item => item.trim() !== ''),
      additionalCosts: additionalCosts.filter(item => item.service.trim() !== '')
    };

    console.log(`📝 Основная услуга обновлена: ${servicesStore.mainServices[serviceIndex].name}`);
    
    res.json({
      status: 'success',
      message: 'Основная услуга успешно обновлена',
      data: servicesStore.mainServices[serviceIndex]
    });
  } catch (error) {
    console.error('Ошибка обновления основной услуги:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления основной услуги',
      error: error.message
    });
  }
});

// Удалить основную услугу
app.delete('/api/services/main/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    
    const serviceIndex = servicesStore.mainServices.findIndex(service => service.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Услуга не найдена'
      });
    }

    const deletedService = servicesStore.mainServices[serviceIndex];
    servicesStore.mainServices.splice(serviceIndex, 1);

    console.log(`🗑️ Основная услуга удалена: ${deletedService.name}`);
    
    res.json({
      status: 'success',
      message: 'Основная услуга успешно удалена'
    });
  } catch (error) {
    console.error('Ошибка удаления основной услуги:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка удаления основной услуги',
      error: error.message
    });
  }
});

// Создать дополнительную услугу
app.post('/api/services/additional', (req, res) => {
  try {
    const { name, description, cost, unit, note } = req.body;
    
    const newService = {
      id: Date.now(),
      name,
      description,
      cost: parseInt(cost),
      unit,
      note
    };

    servicesStore.additionalServices.push(newService);
    
    console.log(`✅ Дополнительная услуга создана: ${newService.name}`);
    
    res.json({
      status: 'success',
      message: 'Дополнительная услуга успешно создана',
      data: newService
    });
  } catch (error) {
    console.error('Ошибка создания дополнительной услуги:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка создания дополнительной услуги',
      error: error.message
    });
  }
});

// Обновить дополнительную услугу
app.put('/api/services/additional/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { name, description, cost, unit, note } = req.body;
    
    const serviceIndex = servicesStore.additionalServices.findIndex(service => service.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Дополнительная услуга не найдена'
      });
    }

    servicesStore.additionalServices[serviceIndex] = {
      ...servicesStore.additionalServices[serviceIndex],
      name,
      description,
      cost: parseInt(cost),
      unit,
      note
    };

    console.log(`📝 Дополнительная услуга обновлена: ${servicesStore.additionalServices[serviceIndex].name}`);
    
    res.json({
      status: 'success',
      message: 'Дополнительная услуга успешно обновлена',
      data: servicesStore.additionalServices[serviceIndex]
    });
  } catch (error) {
    console.error('Ошибка обновления дополнительной услуги:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления дополнительной услуги',
      error: error.message
    });
  }
});

// Удалить дополнительную услугу
app.delete('/api/services/additional/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    
    const serviceIndex = servicesStore.additionalServices.findIndex(service => service.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Дополнительная услуга не найдена'
      });
    }

    const deletedService = servicesStore.additionalServices[serviceIndex];
    servicesStore.additionalServices.splice(serviceIndex, 1);

    console.log(`🗑️ Дополнительная услуга удалена: ${deletedService.name}`);
    
    res.json({
      status: 'success',
      message: 'Дополнительная услуга успешно удалена'
    });
  } catch (error) {
    console.error('Ошибка удаления дополнительной услуги:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка удаления дополнительной услуги',
      error: error.message
    });
  }
});

// Обновить способы оплаты
app.put('/api/services/payment-methods', (req, res) => {
  try {
    const methods = req.body;
    servicesStore.paymentTerms.methods = methods;
    
    console.log(`📝 Способы оплаты обновлены`);
    
    res.json({
      status: 'success',
      message: 'Способы оплаты успешно обновлены',
      data: methods
    });
  } catch (error) {
    console.error('Ошибка обновления способов оплаты:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления способов оплаты',
      error: error.message
    });
  }
});

// Обновить график оплаты
app.put('/api/services/payment-schedule', (req, res) => {
  try {
    const schedule = req.body;
    servicesStore.paymentTerms.schedule = schedule;
    
    console.log(`📝 График оплаты обновлен`);
    
    res.json({
      status: 'success',
      message: 'График оплаты успешно обновлен',
      data: schedule
    });
  } catch (error) {
    console.error('Ошибка обновления графика оплаты:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления графика оплаты',
      error: error.message
    });
  }
});

// Обновить скидки
app.put('/api/services/discounts', (req, res) => {
  try {
    const discounts = req.body;
    servicesStore.paymentTerms.discounts = discounts;
    
    console.log(`📝 Скидки обновлены`);
    
    res.json({
      status: 'success',
      message: 'Скидки успешно обновлены',
      data: discounts
    });
  } catch (error) {
    console.error('Ошибка обновления скидок:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления скидок',
      error: error.message
    });
  }
});

// Обновить информацию о договоре
app.put('/api/services/contract-info', (req, res) => {
  try {
    const contractInfo = req.body;
    servicesStore.contractInfo = contractInfo;
    
    console.log(`📝 Информация о договоре обновлена`);
    
    res.json({
      status: 'success',
      message: 'Информация о договоре успешно обновлена',
      data: contractInfo
    });
  } catch (error) {
    console.error('Ошибка обновления информации о договоре:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка обновления информации о договоре',
      error: error.message
    });
  }
});

// Регистрация маршрутов для статистики админ панели
app.use('/admin/stats', adminStatsRoutes);

// Регистрация маршрутов для заявок на обучение
app.use('/api/applications', applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Маршрут ${req.originalUrl} не найден на сервере РУЛЬ+`,
    code: 'ROUTE_NOT_FOUND',
    hint: 'СЕЛ не туда — ПОЕХАЛ в другое место! 🚗',
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Ошибка сервера РУЛЬ+:', error);
  
  res.status(error.statusCode || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Внутренняя ошибка сервера РУЛЬ+' 
      : error.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚗 РУЛЬ+ сервер запущен на порту ${PORT}`);
  console.log(`🌍 Режим: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🎯 Слоган: СЕЛ — ПОЕХАЛ!`);
  console.log(`🔗 API endpoints:`);
  console.log(`   - Health check: http://localhost:${PORT}/health`);
  console.log(`   - Basic info: http://localhost:${PORT}/api/info/basic`);
  console.log(`   - Staff info: http://localhost:${PORT}/api/info/staff`);
  console.log(`   - Documents: http://localhost:${PORT}/api/documents`);
  console.log(`   - Upload document: POST http://localhost:${PORT}/api/documents`);
  console.log(`   - Update document: PUT http://localhost:${PORT}/api/documents/:id`);
  console.log(`   - Delete document: DELETE http://localhost:${PORT}/api/documents/:id`);
  console.log(`   - Services: http://localhost:${PORT}/api/services`);
  console.log(`   - Create main service: POST http://localhost:${PORT}/api/services/main`);
  console.log(`   - Update main service: PUT http://localhost:${PORT}/api/services/main/:id`);
  console.log(`   - Delete main service: DELETE http://localhost:${PORT}/api/services/main/:id`);
  console.log(`   - Create additional service: POST http://localhost:${PORT}/api/services/additional`);
  console.log(`   - Update additional service: PUT http://localhost:${PORT}/api/services/additional/:id`);
  console.log(`   - Delete additional service: DELETE http://localhost:${PORT}/api/services/additional/:id`);
  console.log(`   - Update payment methods: PUT http://localhost:${PORT}/api/services/payment-methods`);
  console.log(`   - Update payment schedule: PUT http://localhost:${PORT}/api/services/payment-schedule`);
  console.log(`   - Update discounts: PUT http://localhost:${PORT}/api/services/discounts`);
  console.log(`   - Update contract info: PUT http://localhost:${PORT}/api/services/contract-info`);
  console.log(`   - Admin stats quick: http://localhost:${PORT}/admin/stats/quick`);
  console.log(`   - Admin stats detailed: http://localhost:${PORT}/admin/stats/detailed`);
  console.log(`   - Admin stats monthly: http://localhost:${PORT}/admin/stats/monthly`);
  console.log(`   - Submit application: POST http://localhost:${PORT}/api/applications/submit`);
  console.log(`   - Main API: http://localhost:${PORT}/api`);
  console.log(`🚀 РУЛЬ+ готов к работе!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM сигнал получен - завершаем работу РУЛЬ+');
  server.close(() => {
    console.log('РУЛЬ+ сервер успешно остановлен');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT сигнал получен - завершаем работу РУЛЬ+');
  server.close(() => {
    console.log('РУЛЬ+ сервер успешно остановлен');
    process.exit(0);
  });
});

export default app; 