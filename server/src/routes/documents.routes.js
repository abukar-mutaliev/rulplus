import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { DocumentService } from '../services/document.service.prisma.js';

console.log('📊 Используем PostgreSQL + Prisma сервис документов');

const router = express.Router();

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

// Получить все документы
router.get('/', async (req, res) => {
  try {
    const result = await DocumentService.getAllDocuments();
    res.json(result);
  } catch (error) {
    console.error('Ошибка при получении документов:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении документов',
      error: error.message
    });
  }
});

// Получить документы по категории
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const result = await DocumentService.getDocumentsByCategory(category);
    res.json(result);
  } catch (error) {
    console.error('Ошибка при получении документов по категории:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении документов по категории',
      error: error.message
    });
  }
});

// Получить документ по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🌐 GET /api/documents/:id:', id);

    // Проверяем, содержит ли ID точки или слеши (может быть fileName)
    if (id.includes('.') || id.includes('/')) {
      console.log('🔍 Обнаружен запрос с fileName вместо ID:', id);

      try {
        // Ищем документ по fileName в базе данных
        const { prisma } = await import('../config/prisma.js');
        const document = await prisma.document.findFirst({
          where: { fileName: id }
        });

        if (document) {
          console.log('✅ Найден документ с fileName:', document.id);

          // Если документ найден, перенаправляем на правильный API эндпоинт
          const redirectUrl = `/api/documents/${document.id}`;
          console.log('🔄 Перенаправляем на:', redirectUrl);
          return res.redirect(302, redirectUrl);
        } else {
          console.log('❌ Документ с fileName не найден в БД');
          return res.status(404).json({
            status: 'error',
            message: 'Документ не найден'
          });
        }
      } catch (searchError) {
        console.error('❌ Ошибка поиска документа:', searchError);
        return res.status(500).json({
          status: 'error',
          message: 'Ошибка при поиске документа'
        });
      }
    }

    const result = await DocumentService.getDocumentById(id);
    console.log('✅ Документ найден:', result.data.title);
    res.json(result);
  } catch (error) {
    console.error('❌ Ошибка при получении документа:', error);
    console.error('📋 Запрошенный ID был:', req.params.id);

    if (error.message === 'Документ не найден') {
      return res.status(404).json({
        status: 'error',
        message: error.message
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении документа',
      error: error.message
    });
  }
});

// Создать новый документ
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, status, expiryDate } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Требуются поля: title, description, category'
      });
    }

    const documentData = {
      title,
      description,
      category,
      status: status || 'active',
      expiryDate: expiryDate ? new Date(expiryDate) : undefined
    };

    // Если файл был загружен
    if (req.file) {
      documentData.fileUrl = `/documents/${req.file.filename}`;
      documentData.fileName = req.file.filename;
      documentData.fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} МБ`;
    }

    const result = await DocumentService.createDocument(documentData);

    console.log(`📄 Новый документ создан: ${title} (${category})`);
    console.log(`🆔 ID созданного документа:`, result.data?.id);

    res.status(201).json(result);

  } catch (error) {
    console.error('Ошибка при создании документа:', error);

    // Удаляем загруженный файл в случае ошибки
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      status: 'error',
      message: 'Ошибка при создании документа',
      error: error.message
    });
  }
});

// Обновить документ
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status, expiryDate } = req.body;

    console.log('🔄 Запрос на обновление документа:');
    console.log('📋 ID из параметров:', id);
    console.log('📝 Данные формы:', { title, description, category, status, expiryDate });

    const documentData = {};

    if (title !== undefined) documentData.title = title;
    if (description !== undefined) documentData.description = description;
    if (category !== undefined) documentData.category = category;
    if (status !== undefined) documentData.status = status;
    if (expiryDate !== undefined) documentData.expiryDate = expiryDate ? new Date(expiryDate) : null;

    // Если загружен новый файл
    if (req.file) {
      // Получаем старый документ для удаления старого файла
      const oldDocument = await DocumentService.getDocumentById(id);
      if (oldDocument.data.fileName) {
        const oldFilePath = path.join(documentsDir, oldDocument.data.fileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log(`🗑️ Старый файл удален: ${oldDocument.data.fileName}`);
        }
      }

      documentData.fileUrl = `/documents/${req.file.filename}`;
      documentData.fileName = req.file.filename;
      documentData.fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} МБ`;
    }

    const result = await DocumentService.updateDocument(id, documentData);

    console.log(`📝 Документ обновлен: ${result.data.title}`);
    console.log(`✅ Обновленный документ ID: ${result.data.id}`);
    console.log(`📁 Новый файл: ${documentData.fileName || 'файл не изменен'}`);

    res.json(result);

  } catch (error) {
    console.error('Ошибка при обновлении документа:', error);

    // Удаляем загруженный файл в случае ошибки
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (error.message === 'Документ не найден') {
      return res.status(404).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Ошибка при обновлении документа',
      error: error.message
    });
  }
});

// Удалить документ
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ DELETE /api/documents/:id');
    console.log('📋 ID для удаления:', id);

    // Получаем документ перед удалением для удаления файла
    const document = await DocumentService.getDocumentById(id);

    const result = await DocumentService.deleteDocument(id);

    // Удаляем файл с диска, если он есть
    if (document.data.fileName) {
      const filePath = path.join(documentsDir, document.data.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Файл удален: ${document.data.fileName}`);
      }
    }

    console.log(`🗑️ Документ удален: ${result.data.title}`);

    res.json(result);

  } catch (error) {
    console.error('Ошибка при удалении документа:', error);

    if (error.message === 'Документ не найден') {
      return res.status(404).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Ошибка при удалении документа',
      error: error.message
    });
  }
});

// Поиск документов
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const result = await DocumentService.searchDocuments(query);
    res.json(result);
  } catch (error) {
    console.error('Ошибка при поиске документов:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при поиске документов',
      error: error.message
    });
  }
});

// Получить статистику документов
router.get('/stats/overview', async (req, res) => {
  try {
    const result = await DocumentService.getDocumentStats();
    res.json(result);
  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении статистики',
      error: error.message
    });
  }
});

export default router;
