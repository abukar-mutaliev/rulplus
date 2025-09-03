import DocumentModel from '../models/Document.js';

export class DocumentService {

  /**
   * Получить все документы
   */
  static async getAllDocuments() {
    try {
      const documents = await DocumentModel.find().sort({ uploadDate: -1 });

      // Группируем документы по категориям для совместимости с существующим API
      const groupedDocuments: { [key: string]: any[] } = {};
      const categories = ['charter', 'license', 'accreditation', 'regulations', 'reports', 'collective', 'prescriptions'];

      categories.forEach(category => {
        groupedDocuments[category] = documents
          .filter(doc => doc.category === category)
          .map(doc => ({
            id: doc._id.toString(),
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
      console.error('Ошибка при получении документов:', error);
      throw new Error('Не удалось получить документы');
    }
  }

  /**
   * Получить документы по категории
   */
  static async getDocumentsByCategory(category: string) {
    try {
      const documents = await DocumentModel.find({ category }).sort({ uploadDate: -1 });

      const formattedDocuments = documents.map(doc => ({
        id: doc._id.toString(),
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
      console.error('Ошибка при получении документов по категории:', error);
      throw new Error(`Не удалось получить документы категории ${category}`);
    }
  }

  /**
   * Получить документ по ID
   */
  static async getDocumentById(id: string) {
    try {
      const document = await DocumentModel.findById(id);

      if (!document) {
        throw new Error('Документ не найден');
      }

      const formattedDocument = {
        id: document._id.toString(),
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
      console.error('Ошибка при получении документа:', error);
      throw error;
    }
  }

  /**
   * Создать новый документ
   */
  static async createDocument(documentData: CreateDocumentData) {
    try {
      const document = new DocumentModel({
        title: documentData.title,
        description: documentData.description,
        category: documentData.category,
        status: documentData.status || 'active',
        expiryDate: documentData.expiryDate,
        fileUrl: documentData.fileUrl,
        fileName: documentData.fileName,
        fileSize: documentData.fileSize
      });

      const savedDocument = await document.save();

      const formattedDocument = {
        id: savedDocument._id.toString(),
        title: savedDocument.title,
        description: savedDocument.description,
        category: savedDocument.category,
        status: savedDocument.status,
        uploadDate: savedDocument.uploadDate.toISOString().split('T')[0],
        lastUpdate: savedDocument.lastUpdate.toISOString().split('T')[0],
        expiryDate: savedDocument.expiryDate ? savedDocument.expiryDate.toISOString().split('T')[0] : undefined,
        fileUrl: savedDocument.fileUrl,
        fileName: savedDocument.fileName,
        fileSize: savedDocument.fileSize
      };

      return {
        status: 'success',
        data: formattedDocument,
        message: 'Документ успешно создан'
      };
    } catch (error) {
      console.error('Ошибка при создании документа:', error);
      throw new Error('Не удалось создать документ');
    }
  }

  /**
   * Обновить документ
   */
  static async updateDocument(id: string, documentData: UpdateDocumentData) {
    try {
      const updateData: any = {
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

      const document = await DocumentModel.findByIdAndUpdate(id, updateData, { new: true });

      if (!document) {
        throw new Error('Документ не найден');
      }

      const formattedDocument = {
        id: document._id.toString(),
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
      console.error('Ошибка при обновлении документа:', error);
      throw new Error('Не удалось обновить документ');
    }
  }

  /**
   * Удалить документ
   */
  static async deleteDocument(id: string) {
    try {
      const document = await DocumentModel.findByIdAndDelete(id);

      if (!document) {
        throw new Error('Документ не найден');
      }

      const formattedDocument = {
        id: document._id.toString(),
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
      console.error('Ошибка при удалении документа:', error);
      throw new Error('Не удалось удалить документ');
    }
  }

  /**
   * Поиск документов
   */
  static async searchDocuments(query: string) {
    try {
      const documents = await DocumentModel.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      }).sort({ uploadDate: -1 });

      const formattedDocuments = documents.map(doc => ({
        id: doc._id.toString(),
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
      console.error('Ошибка при поиске документов:', error);
      throw new Error('Не удалось выполнить поиск');
    }
  }

  /**
   * Получить статистику документов
   */
  static async getDocumentStats() {
    try {
      const totalDocuments = await DocumentModel.countDocuments();
      const activeDocuments = await DocumentModel.countDocuments({ status: 'active' });

      const categoryStats = await DocumentModel.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      return {
        status: 'success',
        data: {
          totalDocuments,
          activeDocuments,
          categories: categoryStats,
          lastUpdated: new Date().toISOString()
        },
        message: 'Статистика успешно получена'
      };
    } catch (error) {
      console.error('Ошибка при получении статистики:', error);
      throw new Error('Не удалось получить статистику');
    }
  }
}
