import { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Link
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { 
  AdminPanelSettings,
  Visibility,
  VisibilityOff,
  DirectionsCar
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAccess } from '../../../shared/hooks/useAdminAccess';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enableAdminMode } = useAdminAccess();
  
  // Получаем путь, с которого пришел пользователь
  const from = (location.state as any)?.from || '/admin';
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Простые учетные данные для демонстрации
  const ADMIN_CREDENTIALS = {
    username: 'amurklan@mail.ru',
    password: 'rulplus2024'
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError(''); // Очищаем ошибку при изменении данных
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Симуляция запроса к серверу
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Простая проверка учетных данных
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        // Успешная авторизация
        enableAdminMode();
        navigate(from, { replace: true });
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (err) {
      setError('Ошибка при авторизации. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>Вход в систему - РУЛЬ+ | СЕЛ - ПОЕХАЛ</title>
        <meta name="description" content="Авторизация администратора автошколы РУЛЬ+. Доступ к панели управления системой." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container maxWidth="sm" sx={{ py: 8, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Paper 
          elevation={8} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          {/* Заголовок с логотипом */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <AdminPanelSettings sx={{ fontSize: 48, color: 'primary.main', mr: 1 }} />
              <DirectionsCar sx={{ fontSize: 32, color: 'primary.main' }} />
            </Box>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #212529, #dc3545)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              РУЛЬ<span style={{ color: '#dc3545' }}>+</span> Админ
            </Typography>
            <Typography variant="h6" color="text.secondary">
              СЕЛ — ПОЕХАЛ в управление!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Вход в панель администратора
            </Typography>
          </Box>

          {/* Форма авторизации */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={formData.username}
              onChange={handleInputChange('username')}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              error={!!error}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              margin="normal"
              required
              autoComplete="current-password"
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                mb: 2
              }}
            >
              {isLoading ? 'Вход в систему...' : 'Войти'}
            </Button>
          </Box>

          {/* Ссылка на главную */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link
              component={RouterLink}
              to="/"
              color="primary"
              sx={{ 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              ← Вернуться на главную страницу
            </Link>
          </Box>

          {/* Информация о безопасности */}
          <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
              🔐 Все соединения защищены шифрованием<br />
              🛡️ Данные авторизации обрабатываются конфиденциально
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage; 