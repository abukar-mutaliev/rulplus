import { useState, useEffect, useCallback } from 'react';
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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoRulPlus from '../../../assets/logoRulPlus.png';
import useAdminAccess from "@shared/hooks/useAdminAccess.ts";

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAdminAccess();

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [educationMenuAnchor, setEducationMenuAnchor] = useState<null | HTMLElement>(null);

  // Принудительно закрываем все меню при изменении маршрута
  useEffect(() => {
    setMobileMenuAnchor(null);
    setEducationMenuAnchor(null);
  }, [location.pathname]);

  // Закрываем меню при клике вне их области
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuAnchor || educationMenuAnchor) {
        setMobileMenuAnchor(null);
        setEducationMenuAnchor(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuAnchor, educationMenuAnchor]);

  const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setEducationMenuAnchor(null); // Закрываем другое меню
    setMobileMenuAnchor(event.currentTarget);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuAnchor(null);
  }, []);

  const handleEducationMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMobileMenuAnchor(null); // Закрываем другое меню
    setEducationMenuAnchor(event.currentTarget);
  }, []);

  const handleEducationMenuClose = useCallback(() => {
    setEducationMenuAnchor(null);
  }, []);

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

  const handleNavigate = useCallback((path: string) => {
    // Принудительно закрываем все меню
    setMobileMenuAnchor(null);
    setEducationMenuAnchor(null);
    navigate(path);
  }, [navigate]);

  return (
      <AppBar
          position="static"
          elevation={1}
          sx={{
            background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
            zIndex: 1000,
          }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Логотип и брендинг */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
              <Box
                  component={Link}
                  to="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
              >
                <img
                    src={logoRulPlus}
                    alt="РУЛЬ+ логотип"
                    style={{
                      height: '48px',
                      width: 'auto',
                      marginRight: '12px',
                    }}
                />
                <Box>
                  <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        color: 'white',
                        letterSpacing: '1px',
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

            {/* Admin button - показывается только админам */}
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
        {educationMenuAnchor && (
          <Menu
              anchorEl={educationMenuAnchor}
              open={Boolean(educationMenuAnchor)}
              onClose={handleEducationMenuClose}
              MenuListProps={{
                'aria-labelledby': 'education-menu-button',
                onClick: (e) => e.stopPropagation(),
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPaper-root': {
                  mt: 1,
                  minWidth: 250,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  zIndex: 1001,
                },
                zIndex: 1001,
              }}
          >
            {educationMenuItems.map((item) => (
                <MenuItem
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    sx={{ 
                      minWidth: 250,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      }
                    }}
                >
                  {item.label}
                </MenuItem>
            ))}
          </Menu>
        )}

        {/* Mobile Menu */}
        {mobileMenuAnchor && (
          <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              MenuListProps={{
                'aria-labelledby': 'mobile-menu-button',
                onClick: (e) => e.stopPropagation(),
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiPaper-root': {
                  mt: 1,
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  zIndex: 1001,
                },
                zIndex: 1001,
              }}
          >
            <MenuItem onClick={() => handleNavigate('/')}>
              Главная
            </MenuItem>

            {educationMenuItems.map((item) => (
                <MenuItem
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      }
                    }}
                >
                  {item.label}
                </MenuItem>
            ))}

            <MenuItem onClick={() => handleNavigate('/news')}>
              Новости
            </MenuItem>

            <MenuItem onClick={() => handleNavigate('/contacts')}>
              Контакты
            </MenuItem>

            {isAdmin && (
              <MenuItem onClick={() => handleNavigate('/admin')}>
                Админ-панель
              </MenuItem>
            )}
          </Menu>
        )}
      </AppBar>
  );
};