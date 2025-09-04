import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Phone, Email, LocationOn, AdminPanelSettings, Login } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAdminAccess } from '@shared/hooks/useAdminAccess';
import logoRulPlus from '../../../assets/logoRulPlus.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isAdmin, toggleAdminMode } = useAdminAccess();
  const navigate = useNavigate();

  const handleAdminButtonClick = () => {
    if (isAdmin) {
      toggleAdminMode();
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* О нас */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img
                src={logoRulPlus}
                alt="РУЛЬ+ логотип"
                style={{
                  height: '40px',
                  width: 'auto',
                  marginRight: '12px',
                }}
              />
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                РУЛЬ<span style={{ color: '#dc3545' }}>+</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.300', mb: 1 }}>
              СЕЛ — ПОЕХАЛ к мечте!
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.300' }}>
              Автошкола нового поколения. Профессиональное обучение вождению.
            </Typography>
          </Grid>

          {/* Сведения об организации */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" gutterBottom>
              Сведения об организации
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/education/basic"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Основные сведения</Typography>
              </Link>
              <Link
                component={RouterLink}
                to="/education/structure"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Структура и управление</Typography>
              </Link>
              <Link
                component={RouterLink}
                to="/education/documents"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Документы</Typography>
              </Link>
              <Link
                component={RouterLink}
                to="/education/programs"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Образовательные программы</Typography>
              </Link>
              <Link
                component={RouterLink}
                to="/education/services"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Платные услуги</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Полезные ссылки */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" gutterBottom>
              Полезные ссылки
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/contacts"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Контакты</Typography>
              </Link>
              <Link
                href="https://www.gosuslugi.ru/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">Госуслуги</Typography>
              </Link>
              <Link
                href="https://www.gibdd.ru/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2">ГИБДД РФ</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Контакты */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" gutterBottom>
              Контакты
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, color: 'grey.400' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  г. Назрань, пр-т. И. Базоркина, д. 28 В
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, color: 'grey.400' }} />
                <Link
                  href="tel:+7 (988) 822-28-88"
                  color="inherit"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  <Typography variant="body2">+7 (988) 822-28-88</Typography>
                </Link>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, color: 'grey.400' }} />
                <Link
                  href="mailto:rulplus@mail.ru"
                  color="inherit"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  <Typography variant="body2">rulplus@mail.ru</Typography>
                </Link>
              </Box>
              
              <Typography variant="body2" sx={{ color: 'grey.400', mt: 1 }}>
                Режим работы:<br />
                Пн-Пт: 09:00 - 18:00<br />
                Сб: 10:00 - 16:00<br />
                Вс: выходной
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              © {currentYear} РУЛЬ+. Все права защищены.
            </Typography>
            
            {/* Скрытая кнопка для разработчиков */}
            <Tooltip title={isAdmin ? "Выйти из режима администратора" : "Войти в админ-панель"}>
              <IconButton
                size="small"
                onClick={handleAdminButtonClick}
                sx={{ 
                  color: isAdmin ? 'primary.main' : 'grey.600',
                  opacity: 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                {isAdmin ? <AdminPanelSettings fontSize="small" /> : <Login fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>

        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'grey.500' }}>
            Дата последнего обновления информации: {new Date().toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}; 