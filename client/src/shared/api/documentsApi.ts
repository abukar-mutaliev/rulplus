// API для работы с документами РУЛЬ+
// В продакшене используем относительные пути, в разработке - полный URL сервера API
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';
const FILES_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  uploadDate: string;
  lastUpdate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'not_required';
}

export interface DocumentsData {
  charter: Document[];
  license: Document[];
  accreditation: Document[];
  regulations: Document[];
  reports: Document[];
  collective: Document[];
  prescriptions: Document[];
  lastUpdated?: string;
  [key: string]: Document[] | string | undefined;
}

export interface DocumentsResponse {
  status: string;
  data: DocumentsData;
  message?: string;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
}

// Вспомогательная функция для обработки ошибок
const handleApiError = (error: any, defaultMessage: string): never => {
  console.error('API Error:', error);
  if (error.response) {
    throw new Error(error.response.data?.message || defaultMessage);
  }
  throw new Error(error.message || defaultMessage);
};

// Экспортируем функцию для использования в будущем
export { handleApiError };

export const documentsApi = {
  // Получить все документы
  getDocuments: async (): Promise<DocumentsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DocumentsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке документов:', error);
      throw error;
    }
  },

  // Получить документы по категории
  getDocumentsByCategory: async (category: string): Promise<{ status: string; data: Document[]; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке документов по категории:', error);
      throw error;
    }
  },

  // Получить документ по ID
  getDocumentById: async (id: string): Promise<{ status: string; data: Document; message: string }> => {
    try {
      console.log('🔍 getDocumentById вызван с ID:', id);
      console.log('📋 Стек вызовов:', new Error().stack?.split('\n').slice(0, 5).join('\n'));

      const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка HTTP:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ getDocumentById получил результат:', result);
      return result;
    } catch (error) {
      console.error('❌ Ошибка в getDocumentById:', error);
      throw error;
    }
  },

  // Создать новый документ
  createDocument: async (documentData: {
    title: string;
    description: string;
    category: string;
    status?: string;
    expiryDate?: string;
    file?: File;
  }): Promise<{ status: string; data: Document; message: string }> => {
    try {
      const formData = new FormData();

      // Добавляем текстовые данные
      formData.append('title', documentData.title);
      formData.append('description', documentData.description);
      formData.append('category', documentData.category);
      if (documentData.status) formData.append('status', documentData.status);
      if (documentData.expiryDate) formData.append('expiryDate', documentData.expiryDate);

      // Добавляем файл если он есть
      if (documentData.file) {
        formData.append('file', documentData.file);
      }

      const response = await fetch(`${API_BASE_URL}/documents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📄 Ответ сервера при создании документа:', result);
      return result;
    } catch (error) {
      console.error('❌ Ошибка при создании документа:', error);
      throw error;
    }
  },

  // Обновить документ
  updateDocument: async (id: string, documentData: {
    title?: string;
    description?: string;
    category?: string;
    status?: string;
    expiryDate?: string;
    file?: File;
  }): Promise<{ status: string; data: Document; message: string }> => {
    try {
      const formData = new FormData();

      // Добавляем только измененные поля
      if (documentData.title !== undefined) formData.append('title', documentData.title);
      if (documentData.description !== undefined) formData.append('description', documentData.description);
      if (documentData.category !== undefined) formData.append('category', documentData.category);
      if (documentData.status !== undefined) formData.append('status', documentData.status);
      if (documentData.expiryDate !== undefined) {
        formData.append('expiryDate', documentData.expiryDate || '');
      }

      // Добавляем файл если он есть
      if (documentData.file) {
        formData.append('file', documentData.file);
      }

      console.log('🔄 Отправка запроса на обновление документа:');
      console.log('📋 ID документа:', id);
      console.log('📝 Данные для обновления:', Object.fromEntries(formData.entries()));

      const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении документа:', error);
      throw error;
    }
  },

  // Удалить документ
  deleteDocument: async (id: string): Promise<{ status: string; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при удалении документа:', error);
      throw error;
    }
  },

  // Поиск документов
  searchDocuments: async (query: string): Promise<{ status: string; data: Document[]; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/search/${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при поиске документов:', error);
      throw error;
    }
  },

  // Получить статистику документов
  getDocumentStats: async (): Promise<{ status: string; data: any; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/stats/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении статистики:', error);
      throw error;
    }
  },

  // Скачать документ
  downloadDocument: (fileUrl: string, fileName: string) => {
    try {
      console.log('📥 downloadDocument вызван с fileUrl:', fileUrl);
      const link = document.createElement('a');
      // Файлы обслуживаются напрямую через статический сервер /documents/
      const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${FILES_BASE_URL}${fileUrl}`;
      console.log('📥 Итоговый URL для скачивания:', fullUrl);
      link.href = fullUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('❌ Ошибка при скачивании документа:', error);
      throw new Error('Не удалось скачать документ');
    }
  },

  // Просмотреть документ
  viewDocument: (fileUrl: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        console.log('👁️ viewDocument вызван с fileUrl:', fileUrl);
        // Файлы обслуживаются напрямую через статический сервер /documents/
        const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${FILES_BASE_URL}${fileUrl}`;
        console.log('👁️ Итоговый URL для просмотра:', fullUrl);

        // Сначала проверим доступность файла
        fetch(fullUrl, { method: 'HEAD' })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Файл недоступен: ${response.status}`);
            }

            // Попробуем открыть в новой вкладке
            const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');

            // Если браузер блокирует всплывающие окна, попробуем открыть в текущей вкладке
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
              console.log('⚠️ Всплывающие окна заблокированы, открываем в текущей вкладке');
              // Для безопасности, лучше показать уведомление пользователю
              if (confirm('Браузер блокирует открытие файлов. Открыть в текущей вкладке?')) {
                window.location.href = fullUrl;
              }
            } else {
              console.log('✅ Документ открыт в новой вкладке');
            }

            resolve();
          })
          .catch(error => {
            console.error('❌ Ошибка при проверке файла:', error);
            reject(new Error('Файл недоступен или поврежден'));
          });
      } catch (error) {
        console.error('❌ Ошибка при просмотре документа:', error);
        reject(new Error('Не удалось открыть документ'));
      }
    });
  }
}; 