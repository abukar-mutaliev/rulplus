import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, ExpandMore } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAccess } from '../../../../shared/hooks/useAdminAccess';
import logoRulPlus from '../../../../assets/logoRulPlus.jpg';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAdmin } = useAdminAccess();

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [educationMenuAnchor, setEducationMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleEducationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEducationMenuAnchor(event.currentTarget);
  };

  const handleEducationMenuClose = () => {
    setEducationMenuAnchor(null);
  };

  const educationMenuItems = [
    { label: 'Основные сведения', path: '/education/basic' },
    { label: 'Структура и органы управления', path: '/education/structure' },
    { label: 'Документы', path: '/education/documents' },
    { label: 'Образование', path: '/education/programs' },
    { label: 'Руководство. Педагогический состав', path: '/education/staff' },
    { label: 'Материально-техническое обеспечение', path: '/education/materials' },
    { label: 'Платные образовательные услуги', path: '/education/services' },
    { label: 'Вакантные места для приема', path: '/education/vacancies' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMobileMenuClose();
    handleEducationMenuClose();
  };

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Логотип и брендинг */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box
                component="img"
                src={logoRulPlus}
                alt="РУЛЬ+"
                sx={{
                  height: 50,
                  width: 'auto',
                  mr: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onError={(e) => {
                  console.error('Ошибка загрузки логотипа:', e);
                }}
                onLoad={() => {
                  console.log('Логотип успешно загружен:', logoRulPlus);
                }}
              />
            </Link>
            <Box>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 900,
                  color: 'inherit',
                  textDecoration: 'none',
                  letterSpacing: '1px',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
              >
                РУЛЬ<span style={{ color: theme.palette.primary.main }}>+</span>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  lineHeight: 1,
                  mt: -0.5,
                }}
              >
                СЕЛ — ПОЕХАЛ
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ mx: 1 }}
              >
                Главная
              </Button>

              <Button
                color="inherit"
                endIcon={<ExpandMore />}
                onClick={handleEducationMenuOpen}
                sx={{ mx: 1 }}
              >
                Сведения об организации
              </Button>



              <Button
                color="inherit"
                component={Link}
                to="/contacts"
                sx={{ mx: 1 }}
              >
                Контакты
              </Button>
            </Box>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                size="large"
                aria-label="menu"
                color="inherit"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Admin button - видна только администраторам */}
          {!isMobile && isAdmin && (
            <Button
              color="primary"
              component={Link}
              to="/admin"
              variant="contained"
              sx={{
                ml: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Админ-панель
            </Button>
          )}
        </Toolbar>
      </Container>

      {/* Education Menu */}
      <Menu
        anchorEl={educationMenuAnchor}
        open={Boolean(educationMenuAnchor)}
        onClose={handleEducationMenuClose}
        MenuListProps={{
          'aria-labelledby': 'education-menu-button',
        }}
      >
        {educationMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            sx={{ minWidth: 300 }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        MenuListProps={{
          'aria-labelledby': 'mobile-menu-button',
        }}
      >
        <MenuItem onClick={() => handleNavigate('/')}>
          Главная
        </MenuItem>
        
        {educationMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigate(item.path)}
          >
            {item.label}
          </MenuItem>
        ))}
        

        
        <MenuItem onClick={() => handleNavigate('/contacts')}>
          Контакты
        </MenuItem>
        
        {/* Пункт админ-панели в мобильном меню - только для админов */}
        {isAdmin && (
          <MenuItem onClick={() => handleNavigate('/admin')}>
            Админ-панель
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
}; 