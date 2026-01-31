import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Suspense, lazy } from 'react';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('../pages/Home'));
const BasicInfoPage = lazy(() => import('../pages/Education/BasicInfo'));
const StructurePage = lazy(() => import('../pages/Education/Structure'));
const DocumentsPage = lazy(() => import('../pages/Education/Documents'));
const ProgramsPage = lazy(() => import('../pages/Education/Programs'));
const ServicesPage = lazy(() => import('../pages/Education/Services'));
const MaterialsPage = lazy(() => import('../pages/Education/Materials'));
const VacanciesPage = lazy(() => import('../pages/Education/Vacancies'));
const ContactsPage = lazy(() => import('../pages/Contacts'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));
const LoginPage = lazy(() => import('../pages/Auth/Login'));

// Компоненты админ-панели
const ContentManagement = lazy(() => import('../pages/AdminPanel/ContentManagement'));
const DocumentsManagement = lazy(() => import('../pages/AdminPanel/DocumentsManagement'));
const ServicesManagement = lazy(() => import('../pages/AdminPanel/ServicesManagement'));
const StaffManagement = lazy(() => import('../pages/AdminPanel/StaffManagement'));
const StudentsManagement = lazy(() => import('../pages/AdminPanel/StudentsManagement'));
const Analytics = lazy(() => import('../pages/AdminPanel/Analytics'));
const FleetManagement = lazy(() => import('../pages/AdminPanel/FleetManagement'));
const Settings = lazy(() => import('../pages/AdminPanel/Settings'));

// Компоненты защиты
import ProtectedRoute from '../shared/components/ProtectedRoute';

// Лейауты
const PublicLayout = lazy(() => import('../widgets/Layout/PublicLayout'));

// Кастомная тема под бренд "РУЛЬ+"
const theme = createTheme({
  palette: {
    primary: {
      main: '#dc3545', // Красный цвет из логотипа
      dark: '#b02a37',
      light: '#e3606d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#212529', // Темно-серый/черный
      dark: '#000000',
      light: '#495057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#6c757d',
    },
    error: {
      main: '#dc3545',
    },
    warning: {
      main: '#ffc107',
    },
    success: {
      main: '#28a745',
    },
    info: {
      main: '#17a2b8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(220, 53, 69, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// React Query клиент
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

// Компонент загрузки
const LoadingSpinner = () => (
  <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h6" color="text.secondary">
      Загрузка...
    </Typography>
  </Container>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<HomePage />} />
                  
                  {/* Сведения об образовательной организации */}
                  <Route path="education">
                    <Route path="basic" element={<BasicInfoPage />} />
                    <Route path="structure" element={<StructurePage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="programs" element={<ProgramsPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="materials" element={<MaterialsPage />} />
                    <Route path="vacancies" element={<VacanciesPage />} />
                  </Route>
                  
                  {/* Контакты */}
                  <Route path="contacts" element={<ContactsPage />} />
                  
                  {/* Авторизация */}
                  <Route path="auth/login" element={<LoginPage />} />
                  
                  {/* Админ-панель - только для авторизованных администраторов */}
                  <Route 
                    path="admin" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <AdminPanel />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Модули админ-панели */}
                  <Route 
                    path="admin/content" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <ContentManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/documents" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <DocumentsManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/services" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <ServicesManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/staff" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <StaffManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/students" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <StudentsManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/analytics" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Analytics />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/fleet" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <FleetManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="admin/settings" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Settings />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* 404 страница */}
                  <Route 
                    path="*" 
                    element={
                      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                        <Typography variant="h3" gutterBottom>
                          404 - Страница не найдена
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Запрашиваемая страница не существует.
                        </Typography>
                      </Container>
                    } 
                  />
                </Route>
              </Routes>
            </Suspense>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#212529',
                  color: '#fff',
                  borderRadius: '8px',
                },
                success: {
                  style: {
                    background: '#28a745',
                  },
                },
                error: {
                  style: {
                    background: '#dc3545',
                  },
                },
              }}
            />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App; 