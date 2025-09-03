import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('@pages/Home'));
const BasicInfoPage = lazy(() => import('@pages/Education/BasicInfo'));
const StructurePage = lazy(() => import('@pages/Education/Structure'));
const DocumentsPage = lazy(() => import('@pages/Education/Documents'));
const EducationProgramsPage = lazy(() => import('@pages/Education/Programs'));
const StaffPage = lazy(() => import('@pages/Education/Staff'));
const MaterialsPage = lazy(() => import('@pages/Education/Materials'));
const ServicesPage = lazy(() => import('@pages/Education/Services'));
const VacanciesPage = lazy(() => import('@pages/Education/Vacancies'));
const NewsPage = lazy(() => import('@pages/News'));
const NewsDetailPage = lazy(() => import('@pages/News/Detail'));
const ContactsPage = lazy(() => import('@pages/Contacts'));

// Админские страницы
const AdminLoginPage = lazy(() => import('@pages/Admin/Login'));
const AdminDashboard = lazy(() => import('@pages/Admin/Dashboard'));
const ContentEditor = lazy(() => import('@pages/Admin/ContentEditor'));
const FileManager = lazy(() => import('@pages/Admin/FileManager'));
const NewsManager = lazy(() => import('@pages/Admin/NewsManager'));
const AuditLogs = lazy(() => import('@pages/Admin/AuditLogs'));

// Лейауты
const PublicLayout = lazy(() => import('@widgets/Layout/PublicLayout'));
const AdminLayout = lazy(() => import('@widgets/Layout/AdminLayout'));

// Компонент загрузки
const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      fontSize: '18px',
      color: '#666',
    }}
  >
    Загрузка...
  </div>
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Публичные страницы */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Сведения об образовательной организации */}
          <Route path="education">
            <Route path="basic" element={<BasicInfoPage />} />
            <Route path="structure" element={<StructurePage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="programs" element={<EducationProgramsPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="vacancies" element={<VacanciesPage />} />
          </Route>
          
          {/* Новости */}
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          
          {/* Контакты */}
          <Route path="contacts" element={<ContactsPage />} />
        </Route>

        {/* Авторизация */}
        <Route path="/auth/login" element={<AdminLoginPage />} />

        {/* Административная панель */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="content/:section" element={<ContentEditor />} />
          <Route path="files" element={<FileManager />} />
          <Route path="news" element={<NewsManager />} />
          <Route path="logs" element={<AuditLogs />} />
        </Route>

        {/* 404 страница */}
        <Route 
          path="*" 
          element={
            <div style={{ 
              textAlign: 'center', 
              padding: '50px',
              fontSize: '18px',
              color: '#666'
            }}>
              <h1>404 - Страница не найдена</h1>
              <p>Запрашиваемая страница не существует.</p>
            </div>
          } 
        />
      </Routes>
    </Suspense>
  );
}; 