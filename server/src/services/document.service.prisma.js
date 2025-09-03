const { prisma } = require('../config/prisma.js');

class DocumentService {
  /**
   * Получить все документы
   */
  static async getAllDocuments() {
    try {
      console.log('🔍 Получение всех документов из PostgreSQL...');

      const documents = await prisma.document.findMany({
        orderBy: { uploadDate: 'desc' }
      });

      // Группируем документы по категориям для совместимости с существующим API
      const groupedDocuments = {};
      const categories = ['charter', 'license', 'accreditation', 'regulations', 'reports', 'collective', 'prescriptions'];

      categories.forEach(category => {
        groupedDocuments[category] = documents
          .filter(doc => doc.category === category)
          .map(doc => ({
            id: doc.id,
            title: doc.title,
            description: doc.description,
            category: doc.category,
            status: doc.status,
            uploadDate: doc.uploadDate.toISOString().split('T')[0],
            lastUpdate: doc.lastUpdate.toISOString().split('T')[0],
            expiryDate: doc.expiryDate ? doc.expiryDate.toISOString().split('T')[0] : undefined,
            fileUrl: doc.fileUrl,
            fileName: doc.fileName,
            fileSize: doc.fileSize
          }));
      });

      return {
        status: 'success',
        data: groupedDocuments,
        message: 'Документы успешно загружены'
      };
    } catch (error) {
      console.error('❌ Ошибка при получении документов из PostgreSQL:', error);
      throw new Error('Не удалось получить документы');
    }
  }

  /**
   * Получить документы по категории
   */
  static async getDocumentsByCategory(category) {
    try {
      const documents = await prisma.document.findMany({
        where: { category },
        orderBy: { uploadDate: 'desc' }
      });

      const formattedDocuments = documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        status: doc.status,
        uploadDate: doc.uploadDate.toISOString().split('T')[0],
        lastUpdate: doc.lastUpdate.toISOString().split('T')[0],
        expiryDate: doc.expiryDate ? doc.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: doc.fileUrl,
        fileName: doc.fileName,
        fileSize: doc.fileSize
      }));

      return {
        status: 'success',
        data: formattedDocuments,
        message: `Документы категории ${category} успешно загружены`
      };
    } catch (error) {
      console.error('❌ Ошибка при получении документов по категории:', error);
      throw new Error(`Не удалось получить документы категории ${category}`);
    }
  }

  /**
   * Получить документ по ID
   */
  static async getDocumentById(id) {
    try {
      console.log('🔍 Поиск документа по ID в PostgreSQL:', id);

      const document = await prisma.document.findUnique({
        where: { id }
      });

      if (!document) {
        throw new Error('Документ не найден');
      }

      const formattedDocument = {
        id: document.id,
        title: document.title,
        description: document.description,
        category: document.category,
        status: document.status,
        uploadDate: document.uploadDate.toISOString().split('T')[0],
        lastUpdate: document.lastUpdate.toISOString().split('T')[0],
        expiryDate: document.expiryDate ? document.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: document.fileUrl,
        fileName: document.fileName,
        fileSize: document.fileSize
      };

      return {
        status: 'success',
        data: formattedDocument,
        message: 'Документ успешно найден'
      };
    } catch (error) {
      console.error('❌ Ошибка при получении документа из PostgreSQL:', error);
      throw error;
    }
  }

  /**
   * Создать новый документ
   */
  static async createDocument(documentData) {
    try {
      console.log('📄 Создание документа в PostgreSQL:', documentData.title);

      const document = await prisma.document.create({
        data: {
          title: documentData.title,
          description: documentData.description,
          category: documentData.category,
          status: documentData.status || 'active',
          expiryDate: documentData.expiryDate,
          fileUrl: documentData.fileUrl,
          fileName: documentData.fileName,
          fileSize: documentData.fileSize
        }
      });

      console.log('💾 Документ сохранен в PostgreSQL с ID:', document.id);

      const formattedDocument = {
        id: document.id,
        title: document.title,
        description: document.description,
        category: document.category,
        status: document.status,
        uploadDate: document.uploadDate.toISOString().split('T')[0],
        lastUpdate: document.lastUpdate.toISOString().split('T')[0],
        expiryDate: document.expiryDate ? document.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: document.fileUrl,
        fileName: document.fileName,
        fileSize: document.fileSize
      };

      return {
        status: 'success',
        data: formattedDocument,
        message: 'Документ успешно создан'
      };
    } catch (error) {
      console.error('❌ Ошибка при создании документа в PostgreSQL:', error);
      throw new Error('Не удалось создать документ');
    }
  }

  /**
   * Обновить документ
   */
  static async updateDocument(id, documentData) {
    try {
      console.log('🔄 Обновление документа в PostgreSQL с ID:', id);

      const updateData = {
        lastUpdate: new Date()
      };

      if (documentData.title !== undefined) updateData.title = documentData.title;
      if (documentData.description !== undefined) updateData.description = documentData.description;
      if (documentData.category !== undefined) updateData.category = documentData.category;
      if (documentData.status !== undefined) updateData.status = documentData.status;
      if (documentData.expiryDate !== undefined) updateData.expiryDate = documentData.expiryDate;
      if (documentData.fileUrl !== undefined) updateData.fileUrl = documentData.fileUrl;
      if (documentData.fileName !== undefined) updateData.fileName = documentData.fileName;
      if (documentData.fileSize !== undefined) updateData.fileSize = documentData.fileSize;

      const document = await prisma.document.update({
        where: { id },
        data: updateData
      });

      const formattedDocument = {
        id: document.id,
        title: document.title,
        description: document.description,
        category: document.category,
        status: document.status,
        uploadDate: document.uploadDate.toISOString().split('T')[0],
        lastUpdate: document.lastUpdate.toISOString().split('T')[0],
        expiryDate: document.expiryDate ? document.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: document.fileUrl,
        fileName: document.fileName,
        fileSize: document.fileSize
      };

      return {
        status: 'success',
        data: formattedDocument,
        message: 'Документ успешно обновлен'
      };
    } catch (error) {
      console.error('❌ Ошибка при обновлении документа в PostgreSQL:', error);
      if (error.code === 'P2025') {
        throw new Error('Документ не найден');
      }
      throw new Error('Не удалось обновить документ');
    }
  }

  /**
   * Удалить документ
   */
  static async deleteDocument(id) {
    try {
      console.log('🗑️ Удаление документа из PostgreSQL с ID:', id);

      const document = await prisma.document.delete({
        where: { id }
      });

      const formattedDocument = {
        id: document.id,
        title: document.title,
        description: document.description,
        category: document.category,
        status: document.status,
        uploadDate: document.uploadDate.toISOString().split('T')[0],
        lastUpdate: document.lastUpdate.toISOString().split('T')[0],
        expiryDate: document.expiryDate ? document.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: document.fileUrl,
        fileName: document.fileName,
        fileSize: document.fileSize
      };

      return {
        status: 'success',
        data: formattedDocument,
        message: 'Документ успешно удален'
      };
    } catch (error) {
      console.error('❌ Ошибка при удалении документа из PostgreSQL:', error);
      if (error.code === 'P2025') {
        throw new Error('Документ не найден');
      }
      throw new Error('Не удалось удалить документ');
    }
  }

  /**
   * Поиск документов
   */
  static async searchDocuments(query) {
    try {
      const documents = await prisma.document.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } }
          ]
        },
        orderBy: { uploadDate: 'desc' }
      });

      const formattedDocuments = documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        status: doc.status,
        uploadDate: doc.uploadDate.toISOString().split('T')[0],
        lastUpdate: doc.lastUpdate.toISOString().split('T')[0],
        expiryDate: doc.expiryDate ? doc.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: doc.fileUrl,
        fileName: doc.fileName,
        fileSize: doc.fileSize
      }));

      return {
        status: 'success',
        data: formattedDocuments,
        message: `Найдено ${formattedDocuments.length} документов`
      };
    } catch (error) {
      console.error('❌ Ошибка при поиске документов в PostgreSQL:', error);
      throw new Error('Не удалось выполнить поиск');
    }
  }

  /**
   * Получить статистику документов
   */
  static async getDocumentStats() {
    try {
      const totalDocuments = await prisma.document.count();
      const activeDocuments = await prisma.document.count({
        where: { status: 'active' }
      });

      const categoryStats = await prisma.document.groupBy({
        by: ['category'],
        _count: { category: true },
        orderBy: { _count: { category: 'desc' } }
      });

      return {
        status: 'success',
        data: {
          totalDocuments,
          activeDocuments,
          categories: categoryStats.map(stat => ({
            _id: stat.category,
            count: stat._count.category
          })),
          lastUpdated: new Date().toISOString()
        },
        message: 'Статистика успешно получена'
      };
    } catch (error) {
      console.error('❌ Ошибка при получении статистики из PostgreSQL:', error);
      throw new Error('Не удалось получить статистику');
    }
  }
}

module.exports = { DocumentService };
