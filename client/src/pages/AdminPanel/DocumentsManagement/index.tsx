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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  CircularProgress,
  Snackbar
} from '@mui/material';
import {
  Description,
  Add,
  Edit,
  Delete,
  ArrowBack,
  Save,
  Cancel,
  CloudUpload,
  Visibility,
  GetApp,
  ExpandMore,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { documentsApi, DocumentsData, Document } from '../../../shared/api/documentsApi';

const DocumentsManagement = () => {
  const navigate = useNavigate();
  const [documentsData, setDocumentsData] = useState<DocumentsData | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);


  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'charter',
    expiryDate: '',
    status: 'active' as 'active' | 'expired' | 'not_required'
  });

  const documentCategories = [
    { key: 'charter', label: 'Устав', icon: <Description />, color: 'primary' },
    { key: 'license', label: 'Лицензия', icon: <CheckCircle />, color: 'success' },
    { key: 'accreditation', label: 'Аккредитация', icon: <Warning />, color: 'warning' },
    { key: 'regulations', label: 'Правила распорядка', icon: <Description />, color: 'info' },
    { key: 'reports', label: 'Отчеты самообследования', icon: <Description />, color: 'secondary' },
    { key: 'collective', label: 'Коллективный договор', icon: <Description />, color: 'primary' },
    { key: 'prescriptions', label: 'Предписания', icon: <Warning />, color: 'error' }
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentsApi.getDocuments();
      setDocumentsData(response.data);
    } catch (error) {
      console.error('Ошибка загрузки документов:', error);
      showSnackbar('Ошибка загрузки документов', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  // Получение всех документов в плоском массиве
  const getAllDocuments = (): Document[] => {
    if (!documentsData) return [];

    const allDocs: Document[] = [];
    // Проходим по всем категориям и собираем документы
    const categories = ['charter', 'license', 'accreditation', 'regulations', 'reports', 'collective', 'prescriptions'];

    categories.forEach(category => {
      const categoryDocs = documentsData[category];
      if (Array.isArray(categoryDocs)) {
        allDocs.push(...categoryDocs);
      }
    });

    return allDocs;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'error';
      case 'not_required': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'expired': return 'Просрочен';
      case 'not_required': return 'Не требуется';
      default: return status;
    }
  };

  const handleEdit = (document: Document) => {
    setSelectedDocument(document);
    setFormData({
      title: document.title,
      description: document.description,
      category: document.category || 'charter',
      expiryDate: document.expiryDate || '',
      status: document.status || 'active'
    });
    setSelectedFile(null);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (document: Document) => {
    setSelectedDocument(document);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (selectedDocument) {
        await documentsApi.updateDocument(selectedDocument.id, {
          ...formData,
          file: selectedFile || undefined
        });
        showSnackbar('Документ успешно обновлен', 'success');
      } else {
        await documentsApi.createDocument({
          ...formData,
          file: selectedFile || undefined
        });
        showSnackbar('Документ успешно создан', 'success');
      }

      await loadDocuments();

      setIsEditDialogOpen(false);
      setSelectedDocument(null);
      setSelectedFile(null);

    } catch (error: any) {
      console.error('Ошибка сохранения документа:', error);
      showSnackbar(error.message || 'Ошибка сохранения документа', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDocument) return;

    try {
      setSaving(true);
      await documentsApi.deleteDocument(selectedDocument.id);
      showSnackbar('Документ успешно удален', 'success');
      await loadDocuments();
      setIsDeleteDialogOpen(false);
      setSelectedDocument(null);
    } catch (error: any) {
      console.error('Ошибка удаления документа:', error);
      showSnackbar(error.message || 'Ошибка удаления документа', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddNew = () => {
    setSelectedDocument(null);
    setFormData({
      title: '',
      description: '',
      category: 'charter',
      expiryDate: '',
      status: 'active'
    });
    setSelectedFile(null);
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Загрузка документов...
        </Typography>
      </Container>
    );
  }

  const allDocuments = getAllDocuments();
  const stats = {
    total: allDocuments.length,
    active: allDocuments.filter(d => d.status === 'active').length,
    expired: allDocuments.filter(d => d.status === 'expired').length,
    notRequired: allDocuments.filter(d => d.status === 'not_required').length
  };

  if (!documentsData) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Alert severity="error">
          Не удалось загрузить документы
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Управление документами - РУЛЬ+ Админ</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/admin')}
              sx={{ mr: 2 }}
            >
              Назад
            </Button>
            <Description sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Управление документами
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Управление документами образовательной организации
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddNew}
            size="large"
          >
            Добавить документ
          </Button>
        </Box>


        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Всего документов
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
                  Активных
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Просроченных
                </Typography>
                <Typography variant="h4" color="error.main">
                  {stats.expired}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Не требуется
                </Typography>
                <Typography variant="h4" color="info.main">
                  {stats.notRequired}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        {documentCategories.map((category) => {
          const categoryDocs = Array.isArray(documentsData[category.key])
            ? (documentsData[category.key] as Document[])
            : [];

          return (
            <Accordion key={category.key} defaultExpanded sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {category.icon}
                  <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                    {category.label}
                  </Typography>
                  <Chip 
                    label={categoryDocs.length} 
                    size="small" 
                    color={category.color as any}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData({
                        title: '',
                        description: '',
                        category: category.key,
                        expiryDate: '',
                        status: 'active'
                      });
                      setSelectedDocument(null);
                      setSelectedFile(null);
                      setIsEditDialogOpen(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    Добавить
                  </Button>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {categoryDocs.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Документ</TableCell>
                            <TableCell>Файл</TableCell>
                            <TableCell>Дата загрузки</TableCell>
                            <TableCell>Срок действия</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell align="center">Действия</TableCell>
                          </TableRow>
                        </TableHead>
                      <TableBody>
                        {categoryDocs.map((doc: Document) => (
                          <TableRow key={doc.id} hover>
                            <TableCell>
                              <Box>
                                <Typography variant="subtitle2" fontWeight="medium">
                                  {doc.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {doc.description}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {doc.fileName ? (
                                <Box>
                                  <Typography variant="body2">{doc.fileName}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {doc.fileSize}
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  Файл не загружен
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>{doc.uploadDate}</TableCell>
                            <TableCell>
                              {doc.expiryDate ? (
                                <Typography 
                                  variant="body2" 
                                  color={new Date(doc.expiryDate) < new Date() ? 'error' : 'inherit'}
                                >
                                  {doc.expiryDate}
                                </Typography>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  Бессрочно
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={getStatusText(doc.status || 'active')} 
                                size="small" 
                                color={getStatusColor(doc.status || 'active') as any}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Stack direction="row" spacing={1}>
                                {doc.fileUrl && (
                                  <>
                                    <IconButton
                                      size="small"
                                      onClick={async () => {
                                        try {
                                          await documentsApi.viewDocument(doc.fileUrl!);
                                        } catch (error) {
                                          console.error('Ошибка при открытии документа:', error);
                                          // Можно добавить уведомление пользователю
                                          alert('Не удалось открыть документ. Проверьте, что файл существует.');
                                        }
                                      }}
                                      title="Просмотр"
                                    >
                                      <Visibility />
                                    </IconButton>
                                    <IconButton 
                                      size="small"
                                      onClick={() => documentsApi.downloadDocument(doc.fileUrl!, doc.fileName || doc.title)}
                                      title="Скачать"
                                    >
                                      <GetApp />
                                    </IconButton>
                                  </>
                                )}
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleEdit(doc)}
                                  title="Редактировать"
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDelete(doc)}
                                  title="Удалить"
                                  color="error"
                                >
                                  <Delete />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                                              </TableBody>
                      </Table>
                    </TableContainer>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Alert severity="info">
                      В данной категории документы отсутствуют
                    </Alert>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}


        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={handleAddNew}
        >
          <Add />
        </Fab>

        <Dialog open={isEditDialogOpen} onClose={() => !saving && setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedDocument ? 'Редактировать документ' : 'Добавить новый документ'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Название документа"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={saving}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Описание"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={saving}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={saving}>
                    <InputLabel>Категория</InputLabel>
                    <Select
                      value={formData.category}
                      label="Категория"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {documentCategories.map((category) => (
                        <MenuItem key={category.key} value={category.key}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={saving}>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      value={formData.status}
                      label="Статус"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <MenuItem value="active">Активный</MenuItem>
                      <MenuItem value="expired">Просрочен</MenuItem>
                      <MenuItem value="not_required">Не требуется</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 3, textAlign: 'center' }}>
                    <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Загрузить файл документа
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Разрешены файлы: PDF, DOC, DOCX, TXT (максимум 10 МБ)
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUpload />}
                      disabled={saving}
                    >
                      Выбрать файл
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                    </Button>
                    {selectedFile && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        Файл выбран: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} МБ)
                      </Alert>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Срок действия"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    helperText="Оставьте пустым для бессрочного документа"
                    disabled={saving}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} startIcon={<Cancel />} disabled={saving}>
              Отмена
            </Button>
            <Button 
              onClick={handleSave} 
              variant="contained" 
              startIcon={saving ? <CircularProgress size={16} /> : <Save />}
              disabled={saving || !formData.title.trim() || !formData.description.trim()}
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onClose={() => !saving && setIsDeleteDialogOpen(false)}>
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Это действие нельзя отменить!
            </Alert>
            <Typography>
              Вы уверены, что хотите удалить документ "{selectedDocument?.title}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)} disabled={saving}>
              Отмена
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={16} /> : <Delete />}
            >
              {saving ? 'Удаление...' : 'Удалить'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default DocumentsManagement; 