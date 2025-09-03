import axios from 'axios';

// Базовая конфигурация axios
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface AdminStats {
  activeStudents: number;
  instructors: number;
  vehicles: number;
  documents: number;
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  completionRate: number;
}

export interface IApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export const adminStatsApi = {
  // Получить быструю статистику для админ панели
  getQuickStats: async (): Promise<AdminStats> => {
    try {
      const response = await api.get<IApiResponse<AdminStats>>('/admin/stats/quick');
      
      if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Ошибка при получении статистики');
    } catch (error) {
      console.error('Ошибка API adminStats.getQuickStats:', error);
      // Возвращаем дефолтные значения в случае ошибки
      return {
        activeStudents: 0,
        instructors: 0,
        vehicles: 0,
        documents: 0,
        totalStudents: 0,
        totalCourses: 0,
        totalRevenue: 0,
        completionRate: 0
      };
    }
  },

  // Получить детальную статистику
  getDetailedStats: async (): Promise<any> => {
    try {
      const response = await api.get<IApiResponse<any>>('/admin/stats/detailed');
      
      if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Ошибка при получении детальной статистики');
    } catch (error) {
      console.error('Ошибка API adminStats.getDetailedStats:', error);
      return {};
    }
  },

  // Получить статистику по месяцам
  getMonthlyStats: async (): Promise<any> => {
    try {
      const response = await api.get<IApiResponse<any>>('/admin/stats/monthly');
      
      if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Ошибка при получении месячной статистики');
    } catch (error) {
      console.error('Ошибка API adminStats.getMonthlyStats:', error);
      return {};
    }
  }
};

export default adminStatsApi; 