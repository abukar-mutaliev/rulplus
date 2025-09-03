import { useState, useEffect } from 'react';

// Простая система проверки прав администратора
// В реальном проекте здесь была бы полноценная аутентификация
export const useAdminAccess = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = () => {
    try {
      // Проверяем localStorage на наличие флага админа
      const adminFlag = localStorage.getItem('rulplus_admin_access');
      const isAdminUser = adminFlag === 'true';
      
      setIsAdmin(isAdminUser);
    } catch (error) {
      console.warn('Ошибка проверки админ прав:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const enableAdminMode = () => {
    try {
      localStorage.setItem('rulplus_admin_access', 'true');
      setIsAdmin(true);
      console.log('🔐 Режим администратора активирован');
      
      // Можно добавить toast уведомление
      if (typeof window !== 'undefined' && (window as any).toast) {
        (window as any).toast.success('Добро пожаловать в админ-панель РУЛЬ+!');
      }
    } catch (error) {
      console.error('Ошибка активации админ режима:', error);
    }
  };

  const disableAdminMode = () => {
    try {
      localStorage.removeItem('rulplus_admin_access');
      setIsAdmin(false);
      console.log('🔓 Режим администратора деактивирован');
      
      // Можно добавить toast уведомление
      if (typeof window !== 'undefined' && (window as any).toast) {
        (window as any).toast.info('Вы вышли из админ-панели. СЕЛ — ПОЕХАЛ!');
      }
    } catch (error) {
      console.error('Ошибка деактивации админ режима:', error);
    }
  };

  const toggleAdminMode = () => {
    if (isAdmin) {
      disableAdminMode();
    } else {
      enableAdminMode();
    }
  };

  return {
    isAdmin,
    isLoading,
    enableAdminMode,
    disableAdminMode,
    toggleAdminMode,
    checkAdminAccess
  };
};

export default useAdminAccess; 