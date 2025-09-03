import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Button, Alert, Chip, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { 
  Dashboard,
  People,
  School,
  Article,
  Settings,
  Analytics,
  DirectionsCar,
  Logout,
  Description,
  AttachMoney
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAccess } from '../../shared/hooks/useAdminAccess';
import { adminStatsApi, AdminStats } from '../../shared/api/adminStats';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { disableAdminMode } = useAdminAccess();
  
  // Состояние для статистики
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка статистики при монтировании компонента
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminStatsApi.getQuickStats();
        setStats(data);
      } catch (err) {
        setError('Не удалось загрузить статистику');
        console.error('Ошибка загрузки статистики:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleLogout = () => {
    disableAdminMode();
    navigate('/', { replace: true });
  };

  const adminFeatures = [
    {
      title: 'Управление контентом',
      description: 'Статьи, новости, информационные страницы',
      icon: <Article sx={{ fontSize: 40, color: 'primary.main' }} />,
      actions: ['Статьи', 'Новости', 'Страницы'],
      color: '#e3f2fd',
      link: '/admin/content'
    },
    {
      title: 'Управление документами',
      description: 'Официальные документы, лицензии, отчеты',
      icon: <Description sx={{ fontSize: 40, color: 'secondary.main' }} />,
      actions: ['Устав', 'Лицензии', 'Отчеты'],
      color: '#f3e5f5',
      link: '/admin/documents'
    },
    {
      title: 'Управление услугами',
      description: 'Платные услуги, цены, условия оплаты',
      icon: <AttachMoney sx={{ fontSize: 40, color: 'success.main' }} />,
      actions: ['Основные услуги', 'Дополнительные услуги', 'Условия оплаты'],
      color: '#e8f5e8',
      link: '/admin/services'
    },
    {
      title: 'Управление персоналом',
      description: 'Сотрудники, инструкторы, расписание',
      icon: <People sx={{ fontSize: 40, color: 'success.main' }} />,
      actions: ['Сотрудники', 'Инструкторы', 'Расписание'],
      color: '#e8f5e8',
      link: '/admin/staff'
    },
    {
      title: 'Управление студентами',
      description: 'Запись, успеваемость, документы',
      icon: <School sx={{ fontSize: 40, color: 'warning.main' }} />,
      actions: ['Студенты', 'Группы', 'Прогресс'],
      color: '#fff3e0',
      link: '/admin/students'
    },
    {
      title: 'Аналитика и отчеты',
      description: 'Отчеты, статистика, финансы',
      icon: <Analytics sx={{ fontSize: 40, color: 'info.main' }} />,
      actions: ['Статистика', 'Отчеты', 'Финансы'],
      color: '#e3f2fd',
      link: '/admin/analytics'
    },
    {
      title: 'Настройки системы',
      description: 'Конфигурация системы, безопасность',
      icon: <Settings sx={{ fontSize: 40, color: 'secondary.main' }} />,
      actions: ['Настройки', 'Безопасность', 'Интеграции'],
      color: '#f3e5f5',
      link: '/admin/settings'
    },
    {
      title: 'Управление автопарком',
      description: 'Автомобили, техосмотры, ремонт',
      icon: <DirectionsCar sx={{ fontSize: 40, color: 'primary.main' }} />,
      actions: ['Автомобили', 'ТО', 'Ремонт'],
      color: '#ffebee',
      link: '/admin/fleet'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Админ-панель - РУЛЬ+ | СЕЛ - ПОЕХАЛ</title>
        <meta name="description" content="Панель администратора автошколы РУЛЬ+. Управление контентом, персоналом и настройками системы." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Заголовок админ-панели */}
        <Box sx={{ position: 'relative', textAlign: 'center', mb: 6 }}>
          {/* Кнопка выхода */}
          <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: 'secondary.light',
                  color: 'white'
                }
              }}
            >
              Выйти
            </Button>
          </Box>

          <Typography 
            variant="h3" 
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
            Админ-панель РУЛЬ<span style={{ color: '#dc3545' }}>+</span>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            СЕЛ — ПОЕХАЛ в управление! Централизованное управление автошколой
          </Typography>
          
          {/* Индикатор статуса */}
          <Box sx={{ mt: 2 }}>
            <Chip 
              label="Авторизован как администратор" 
              color="success" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>

        {/* Приветственное сообщение */}
        <Alert 
          severity="success" 
          sx={{ mb: 4, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" component={Link} to="/">
              На главную
            </Button>
          }
        >
          <strong>Добро пожаловать!</strong> Система управления РУЛЬ+ готова к работе. 
          Все модули администрирования доступны для использования.
        </Alert>

        {/* Основные функции */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Управление системой
        </Typography>
        <Grid container spacing={4}>
          {adminFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  bgcolor: feature.color,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(220, 53, 69, 0.15)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate(feature.link)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Доступные действия:
                    </Typography>
                    {feature.actions.map((action, actionIndex) => (
                      <Typography 
                        key={actionIndex} 
                        variant="body2" 
                        sx={{ 
                          mb: 0.5,
                          pl: 2,
                          position: 'relative',
                          '&:before': {
                            content: '"•"',
                            position: 'absolute',
                            left: 0,
                            color: 'primary.main',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        {action}
                      </Typography>
                    ))}
                  </Box>

                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(feature.link);
                    }}
                    sx={{ 
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    }}
                  >
                    Открыть
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Информация о системе */}
        <Card sx={{ mt: 6, bgcolor: 'secondary.main', color: 'white' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Система управления РУЛЬ+ v1.0
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Современная платформа для управления автошколой. 
              СЕЛ — ПОЕХАЛ к цифровизации образования!
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4, 
              flexWrap: 'wrap',
              '& > div': {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.8
              }
            }}>
              <Box>
                <Typography variant="body2">
                  🚀 Версия: 1.0.0-beta
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  🔧 React + Node.js
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  📊 MongoDB + Redis
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AdminPanel; 