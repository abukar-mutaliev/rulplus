import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useAdminAccess } from '../hooks/useAdminAccess';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAdmin, isLoading } = useAdminAccess();
  const location = useLocation();

  // Показываем загрузку пока проверяем права доступа
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Проверка прав доступа...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Если требуются права администратора, но пользователь не админ
  if (requireAdmin && !isAdmin) {
    // Перенаправляем на страницу авторизации с сохранением текущего пути
    return (
      <Navigate 
        to="/auth/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Если проверки пройдены, показываем защищенный контент
  return <>{children}</>;
};

export default ProtectedRoute; 