import axios from 'axios';

// Базовая конфигурация axios
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Интерфейсы для типизации данных
export interface IFounder {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface IWorkSchedule {
  weekdays: string;
  saturday: string;
  sunday: string;
  holidays: string;
}

export interface IBranch {
  name: string;
  address: string;
  phone: string;
  slogan?: string;
}

export interface IDirector {
  name: string;
  position: string;
  phone: string;
  email: string;
  workSchedule: string;
  receptionHours: string;
}

export interface IManagement {
  director: IDirector;
}

export interface IBasicInfo {
  fullName: string;
  shortName: string;
  brandName?: string;
  slogan?: string;
  foundedDate: string;
  legalAddress: string;
  actualAddress: string;
  phone: string;
  email: string;
  website: string;
  founder: IFounder;
  management?: IManagement;
  workSchedule: IWorkSchedule;
  branches: IBranch[];
  description?: string;
  mission?: string;
  values?: string[];
  lastUpdated: string;
}

export interface IApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// API функции
export const basicInfoApi = {
  // Получить основные сведения
  getBasicInfo: async (): Promise<IBasicInfo> => {
    try {
      const response = await api.get<IApiResponse<IBasicInfo>>('/info/basic');
      
      if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Ошибка при получении данных');
    } catch (error) {
      console.error('Ошибка API basicInfo.getBasicInfo:', error);
      throw error;
    }
  }
};

export default basicInfoApi; 