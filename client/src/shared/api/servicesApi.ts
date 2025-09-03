// API для управления услугами автошколы
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

export interface IMainService {
  id: number;
  category: string;
  name: string;
  description: string;
  duration: string;
  cost: number;
  includes: string[];
  additionalCosts: {
    service: string;
    cost: string;
    note: string;
  }[];
}

export interface IAdditionalService {
  id: number;
  name: string;
  description: string;
  cost: number;
  unit: string;
  note: string;
}

export interface IPaymentMethod {
  id: number;
  method: string;
}

export interface IPaymentSchedule {
  id: number;
  stage: string;
  amount: string;
  note: string;
}

export interface IDiscount {
  id: number;
  category: string;
  discount: string;
  note: string;
}

export interface IContractInfo {
  templateUrl: string;
  requiredDocuments: string[];
}

export interface IServicesData {
  mainServices: IMainService[];
  additionalServices: IAdditionalService[];
  paymentTerms: {
    methods: IPaymentMethod[];
    schedule: IPaymentSchedule[];
    discounts: IDiscount[];
  };
  contractInfo: IContractInfo;
}

// API клиент для услуг
export const servicesApi = {
  // Получить все данные об услугах
  getServices: async (): Promise<IServicesData> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
      throw error;
    }
  },

  // Создать новую основную услугу
  createMainService: async (service: Omit<IMainService, 'id'>): Promise<IMainService> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/main`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при создании основной услуги:', error);
      throw error;
    }
  },

  // Обновить основную услугу
  updateMainService: async (id: number, service: Partial<IMainService>): Promise<IMainService> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/main/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении основной услуги:', error);
      throw error;
    }
  },

  // Удалить основную услугу
  deleteMainService: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/main/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при удалении основной услуги:', error);
      throw error;
    }
  },

  // Создать дополнительную услугу
  createAdditionalService: async (service: Omit<IAdditionalService, 'id'>): Promise<IAdditionalService> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/additional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при создании дополнительной услуги:', error);
      throw error;
    }
  },

  // Обновить дополнительную услугу
  updateAdditionalService: async (id: number, service: Partial<IAdditionalService>): Promise<IAdditionalService> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/additional/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении дополнительной услуги:', error);
      throw error;
    }
  },

  // Удалить дополнительную услугу
  deleteAdditionalService: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/additional/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при удалении дополнительной услуги:', error);
      throw error;
    }
  },

  // Обновить способы оплаты
  updatePaymentMethods: async (methods: IPaymentMethod[]): Promise<IPaymentMethod[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/payment-methods`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(methods),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении способов оплаты:', error);
      throw error;
    }
  },

  // Обновить график оплаты
  updatePaymentSchedule: async (schedule: IPaymentSchedule[]): Promise<IPaymentSchedule[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/payment-schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении графика оплаты:', error);
      throw error;
    }
  },

  // Обновить скидки
  updateDiscounts: async (discounts: IDiscount[]): Promise<IDiscount[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/discounts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discounts),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении скидок:', error);
      throw error;
    }
  },

  // Обновить информацию о договоре
  updateContractInfo: async (contractInfo: IContractInfo): Promise<IContractInfo> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/contract-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractInfo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении информации о договоре:', error);
      throw error;
    }
  },
}; 