import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fab,
  Tabs,
  Tab
} from '@mui/material';
import {
  Article,
  Add,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Save,
  Cancel
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'news' | 'page';
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const ContentManagement = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'article' as 'article' | 'news' | 'page',
    status: 'draft' as 'published' | 'draft' | 'archived',
    content: ''
  });

  // Моковые данные
  useEffect(() => {
    const mockContents: ContentItem[] = [
      {
        id: '1',
        title: 'Новые правила дорожного движения 2024',
        type: 'article',
        status: 'published',
        author: 'Муталиев А.И.',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        views: 256
      },
      {
        id: '2',
        title: 'Открытие нового филиала в Назрани',
        type: 'news',
        status: 'published',
        author: 'Администратор',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10',
        views: 142
      },
      {
        id: '3',
        title: 'Основные сведения об автошколе',
        type: 'page',
        status: 'published',
        author: 'Муталиев А.И.',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
        views: 89
      },
      {
        id: '4',
        title: 'Скидки для студентов',
        type: 'article',
        status: 'draft',
        author: 'Администратор',
        createdAt: '2024-01-22',
        updatedAt: '2024-01-22',
        views: 0
      }
    ];
    setContents(mockContents);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getFilteredContents = () => {
    switch (tabValue) {
      case 0: return contents; // Все
      case 1: return contents.filter(c => c.type === 'article');
      case 2: return contents.filter(c => c.type === 'news');
      case 3: return contents.filter(c => c.type === 'page');
      default: return contents;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Опубликовано';
      case 'draft': return 'Черновик';
      case 'archived': return 'Архив';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'article': return 'Статья';
      case 'news': return 'Новость';
      case 'page': return 'Страница';
      default: return type;
    }
  };

  const handleEdit = (content: ContentItem) => {
    setSelectedContent(content);
    setFormData({
      title: content.title,
      type: content.type,
      status: content.status,
      content: ''
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (content: ContentItem) => {
    setSelectedContent(content);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedContent) {
      // Логика сохранения изменений
      const updatedContents = contents.map(c => 
        c.id === selectedContent.id 
          ? { ...c, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : c
      );
      setContents(updatedContents);
    }
    setIsEditDialogOpen(false);
    setSelectedContent(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedContent) {
      setContents(contents.filter(c => c.id !== selectedContent.id));
    }
    setIsDeleteDialogOpen(false);
    setSelectedContent(null);
  };

  const handleStatusToggle = (content: ContentItem) => {
    const newStatus = content.status === 'published' ? 'draft' : 'published';
    const updatedContents = contents.map(c => 
      c.id === content.id 
        ? { ...c, status: newStatus as 'published' | 'draft' | 'archived' }
        : c
    );
    setContents(updatedContents);
  };

  const stats = {
    total: contents.length,
    published: contents.filter(c => c.status === 'published').length,
    draft: contents.filter(c => c.status === 'draft').length,
    totalViews: contents.reduce((sum, c) => sum + c.views, 0)
  };

  return (
    <>
      <Helmet>
        <title>Управление контентом - РУЛЬ+ Админ</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Заголовок */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin')}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <Article sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Управление контентом
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Управление статьями, новостями и страницами сайта
            </Typography>
          </Box>
        </Box>

        {/* Статистика */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Всего материалов
                </Typography>
                <Typography variant="h4" color="primary">
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Опубликовано
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.published}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Черновики
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {stats.draft}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Всего просмотров
                </Typography>
                <Typography variant="h4" color="info.main">
                  {stats.totalViews}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Вкладки фильтрации */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Все" />
            <Tab label="Статьи" />
            <Tab label="Новости" />
            <Tab label="Страницы" />
          </Tabs>
        </Box>

        {/* Таблица контента */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Заголовок</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Автор</TableCell>
                  <TableCell>Дата создания</TableCell>
                  <TableCell>Просмотры</TableCell>
                  <TableCell align="center">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredContents().map((content) => (
                  <TableRow key={content.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {content.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getTypeText(content.type)} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(content.status)} 
                        size="small" 
                        color={getStatusColor(content.status) as any}
                      />
                    </TableCell>
                    <TableCell>{content.author}</TableCell>
                    <TableCell>{content.createdAt}</TableCell>
                    <TableCell>{content.views}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleStatusToggle(content)}
                        title={content.status === 'published' ? 'Скрыть' : 'Опубликовать'}
                      >
                        {content.status === 'published' ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(content)}
                        title="Редактировать"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(content)}
                        title="Удалить"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Кнопка добавления */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => {
            setSelectedContent(null);
            setFormData({ title: '', type: 'article', status: 'draft', content: '' });
            setIsEditDialogOpen(true);
          }}
        >
          <Add />
        </Fab>

        {/* Диалог редактирования */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedContent ? 'Редактировать материал' : 'Создать новый материал'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Заголовок"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                sx={{ mb: 3 }}
              />
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Тип</InputLabel>
                    <Select
                      value={formData.type}
                      label="Тип"
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    >
                      <MenuItem value="article">Статья</MenuItem>
                      <MenuItem value="news">Новость</MenuItem>
                      <MenuItem value="page">Страница</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      value={formData.status}
                      label="Статус"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <MenuItem value="draft">Черновик</MenuItem>
                      <MenuItem value="published">Опубликовано</MenuItem>
                      <MenuItem value="archived">Архив</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Содержание"
                multiline
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Введите содержание материала..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} startIcon={<Cancel />}>
              Отмена
            </Button>
            <Button onClick={handleSave} variant="contained" startIcon={<Save />}>
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>

        {/* Диалог удаления */}
        <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Это действие нельзя отменить!
            </Alert>
            <Typography>
              Вы уверены, что хотите удалить материал "{selectedContent?.title}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ContentManagement; 