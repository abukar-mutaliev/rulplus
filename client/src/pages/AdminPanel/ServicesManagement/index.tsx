import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fab
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  ExpandMore,
  AttachMoney,
  Schedule,
  Payment,
  Description,
  School
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { servicesApi, IMainService, IAdditionalService, IPaymentMethod, IPaymentSchedule, IDiscount, IContractInfo } from '../../../shared/api/servicesApi';

const ServicesManagement = () => {
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as any });

  const [mainServiceDialog, setMainServiceDialog] = useState({ open: false, editing: null as IMainService | null });
  const [additionalServiceDialog, setAdditionalServiceDialog] = useState({ open: false, editing: null as IAdditionalService | null });
  const [paymentMethodsDialog, setPaymentMethodsDialog] = useState({ open: false });
  const [paymentScheduleDialog, setPaymentScheduleDialog] = useState({ open: false });
  const [discountsDialog, setDiscountsDialog] = useState({ open: false });
  const [contractInfoDialog, setContractInfoDialog] = useState({ open: false });

  const [mainServiceForm, setMainServiceForm] = useState({
    category: '',
    name: '',
    description: '',
    duration: '',
    cost: '',
    includes: [''],
    additionalCosts: [{ service: '', cost: '', note: '' }]
  });

  const [additionalServiceForm, setAdditionalServiceForm] = useState({
    name: '',
    description: '',
    cost: '',
    unit: '',
    note: ''
  });

  const [paymentMethodsForm, setPaymentMethodsForm] = useState<IPaymentMethod[]>([]);
  const [paymentScheduleForm, setPaymentScheduleForm] = useState<IPaymentSchedule[]>([]);
  const [discountsForm, setDiscountsForm] = useState<IDiscount[]>([]);
  const [contractInfoForm, setContractInfoForm] = useState<IContractInfo>({
    templateUrl: '',
    requiredDocuments: ['']
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await servicesApi.getServices();
      setServicesData(data);
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
      setSnackbar({ open: true, message: 'Ошибка при загрузке услуг', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleMainServiceSave = async () => {
    try {
      setSaving(true);
      if (mainServiceDialog.editing) {
        await servicesApi.updateMainService(mainServiceDialog.editing.id, mainServiceForm);
      } else {
        await servicesApi.createMainService(mainServiceForm);
      }
      setSnackbar({ open: true, message: 'Услуга сохранена', severity: 'success' });
      setMainServiceDialog({ open: false, editing: null });
      loadServices();
    } catch (error) {
      console.error('Ошибка при сохранении услуги:', error);
      setSnackbar({ open: true, message: 'Ошибка при сохранении услуги', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAdditionalServiceSave = async () => {
    try {
      setSaving(true);
      if (additionalServiceDialog.editing) {
        await servicesApi.updateAdditionalService(additionalServiceDialog.editing.id, additionalServiceForm);
      } else {
        await servicesApi.createAdditionalService(additionalServiceForm);
      }
      setSnackbar({ open: true, message: 'Дополнительная услуга сохранена', severity: 'success' });
      setAdditionalServiceDialog({ open: false, editing: null });
      loadServices();
    } catch (error) {
      console.error('Ошибка при сохранении дополнительной услуги:', error);
      setSnackbar({ open: true, message: 'Ошибка при сохранении дополнительной услуги', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMainService = async (id: number) => {
    try {
      await servicesApi.deleteMainService(id);
      setSnackbar({ open: true, message: 'Услуга удалена', severity: 'success' });
      loadServices();
    } catch (error) {
      console.error('Ошибка при удалении услуги:', error);
      setSnackbar({ open: true, message: 'Ошибка при удалении услуги', severity: 'error' });
    }
  };

  const handleDeleteAdditionalService = async (id: number) => {
    try {
      await servicesApi.deleteAdditionalService(id);
      setSnackbar({ open: true, message: 'Дополнительная услуга удалена', severity: 'success' });
      loadServices();
    } catch (error) {
      console.error('Ошибка при удалении дополнительной услуги:', error);
      setSnackbar({ open: true, message: 'Ошибка при удалении дополнительной услуги', severity: 'error' });
    }
  };

  const handleEditMainService = (service: IMainService) => {
    setMainServiceForm({
      category: service.category,
      name: service.name,
      description: service.description,
      duration: service.duration,
      cost: service.cost.toString(),
      includes: service.includes,
      additionalCosts: service.additionalCosts
    });
    setMainServiceDialog({ open: true, editing: service });
  };

  const handleEditAdditionalService = (service: IAdditionalService) => {
    setAdditionalServiceForm({
      name: service.name,
      description: service.description,
      cost: service.cost.toString(),
      unit: service.unit,
      note: service.note
    });
    setAdditionalServiceDialog({ open: true, editing: service });
  };

  const handleAddMainService = () => {
    setMainServiceForm({
      category: '',
      name: '',
      description: '',
      duration: '',
      cost: '',
      includes: [''],
      additionalCosts: [{ service: '', cost: '', note: '' }]
    });
    setMainServiceDialog({ open: true, editing: null });
  };

  const handleAddAdditionalService = () => {
    setAdditionalServiceForm({
      name: '',
      description: '',
      cost: '',
      unit: '',
      note: ''
    });
    setAdditionalServiceDialog({ open: true, editing: null });
  };

  const handlePaymentMethodsSave = async () => {
    try {
      setSaving(true);
      await servicesApi.updatePaymentMethods(paymentMethodsForm);
      setSnackbar({ open: true, message: 'Способы оплаты обновлены', severity: 'success' });
      setPaymentMethodsDialog({ open: false });
      loadServices();
    } catch (error) {
      console.error('Ошибка при сохранении способов оплаты:', error);
      setSnackbar({ open: true, message: 'Ошибка при сохранении способов оплаты', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePaymentScheduleSave = async () => {
    try {
      setSaving(true);
      await servicesApi.updatePaymentSchedule(paymentScheduleForm);
      setSnackbar({ open: true, message: 'График оплаты обновлен', severity: 'success' });
      setPaymentScheduleDialog({ open: false });
      loadServices();
    } catch (error) {
      console.error('Ошибка при сохранении графика оплаты:', error);
      setSnackbar({ open: true, message: 'Ошибка при сохранении графика оплаты', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscountsSave = async () => {
    try {
      setSaving(true);
      await servicesApi.updateDiscounts(discountsForm);
      setSnackbar({ open: true, message: 'Скидки обновлены', severity: 'success' });
      setDiscountsDialog({ open: false });
      loadServices();
    } catch (error) {
      console.error('Ошибка при сохранении скидок:', error);
      setSnackbar({ open: true, message: 'Ошибка при сохранении скидок', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleContractInfoSave = async () => {
    try {
      setSaving(true);
      await servicesApi.updateContractInfo(contractInfoForm);
      setSnackbar({ open: true, message: 'Информация о договоре обновлена', severity: 'success' });
      setContractInfoDialog({ open: false });
      loadServices();
    } catch (error) {
      console.error('Ошибка при сохранении информации о договоре:', error);
      setSnackbar({ open: true, message: 'Ошибка при сохранении информации о договоре', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin')}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <School sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Управление услугами
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Управление платными образовательными услугами
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddMainService}
        >
          Добавить услугу
        </Button>
      </Box>

      {servicesData && (
        <>
          {/* Основные услуги */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <AttachMoney sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Основные услуги
                </Typography>
                <Chip 
                  label={servicesData.mainServices.length} 
                  size="small" 
                  color="primary"
                  sx={{ mr: 2 }}
                />
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Add />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddMainService();
                  }}
                >
                  Добавить
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {servicesData.mainServices.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Категория</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Продолжительность</TableCell>
                        <TableCell>Стоимость</TableCell>
                        <TableCell align="center">Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {servicesData.mainServices.map((service: IMainService) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <Chip label={service.category} size="small" color="primary" />
                          </TableCell>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>{service.duration}</TableCell>
                          <TableCell>{service.cost.toLocaleString('ru-RU')} ₽</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditMainService(service)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteMainService(service.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="info">
                  Основные услуги отсутствуют
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Дополнительные услуги */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Schedule sx={{ mr: 2, color: 'info.main' }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Дополнительные услуги
                </Typography>
                <Chip 
                  label={servicesData.additionalServices.length} 
                  size="small" 
                  color="info"
                  sx={{ mr: 2 }}
                />
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Add />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddAdditionalService();
                  }}
                >
                  Добавить
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {servicesData.additionalServices.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Стоимость</TableCell>
                        <TableCell>Единица</TableCell>
                        <TableCell align="center">Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {servicesData.additionalServices.map((service: IAdditionalService) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>{service.description}</TableCell>
                          <TableCell>{service.cost.toLocaleString('ru-RU')} ₽</TableCell>
                          <TableCell>{service.unit}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditAdditionalService(service)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteAdditionalService(service.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="info">
                  Дополнительные услуги отсутствуют
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Условия оплаты */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Payment sx={{ mr: 2, color: 'success.main' }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Условия оплаты
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaymentMethodsForm(servicesData.paymentTerms.methods);
                      setPaymentMethodsDialog({ open: true });
                    }}
                  >
                    Способы оплаты
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaymentScheduleForm(servicesData.paymentTerms.schedule);
                      setPaymentScheduleDialog({ open: true });
                    }}
                  >
                    График оплаты
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDiscountsForm(servicesData.paymentTerms.discounts);
                      setDiscountsDialog({ open: true });
                    }}
                  >
                    Скидки
                  </Button>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Способы оплаты:
                  </Typography>
                  <List dense>
                    {servicesData.paymentTerms.methods.map((method: IPaymentMethod, index: number) => (
                      <ListItem key={method.id || index}>
                        <ListItemText primary={`• ${method.method}`} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    График оплаты:
                  </Typography>
                  <List dense>
                    {servicesData.paymentTerms.schedule.map((payment: IPaymentSchedule, index: number) => (
                      <ListItem key={payment.id || index}>
                        <ListItemText 
                          primary={`${payment.amount} — ${payment.stage}`}
                          secondary={payment.note}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Скидки:
                  </Typography>
                  <List dense>
                    {servicesData.paymentTerms.discounts.map((discount: IDiscount, index: number) => (
                      <ListItem key={discount.id || index}>
                        <ListItemText 
                          primary={`${discount.discount} — ${discount.category}`}
                          secondary={discount.note}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Информация о договоре */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Description sx={{ mr: 2, color: 'warning.main' }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Информация о договоре
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    setContractInfoForm(servicesData.contractInfo);
                    setContractInfoDialog({ open: true });
                  }}
                >
                  Редактировать
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Необходимые документы:
                  </Typography>
                  <List dense>
                    {servicesData.contractInfo.requiredDocuments.map((doc: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={`• ${doc}`} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Образец договора:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    URL шаблона: {servicesData.contractInfo.templateUrl}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      )}

      {/* Диалог основной услуги */}
      <Dialog 
        open={mainServiceDialog.open} 
        onClose={() => setMainServiceDialog({ open: false, editing: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {mainServiceDialog.editing ? 'Редактировать услугу' : 'Добавить услугу'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Select
                  value={mainServiceForm.category}
                  onChange={(e) => setMainServiceForm({ ...mainServiceForm, category: e.target.value })}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Стоимость"
                type="number"
                value={mainServiceForm.cost}
                onChange={(e) => setMainServiceForm({ ...mainServiceForm, cost: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название услуги"
                value={mainServiceForm.name}
                onChange={(e) => setMainServiceForm({ ...mainServiceForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Описание"
                multiline
                rows={3}
                value={mainServiceForm.description}
                onChange={(e) => setMainServiceForm({ ...mainServiceForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Продолжительность"
                value={mainServiceForm.duration}
                onChange={(e) => setMainServiceForm({ ...mainServiceForm, duration: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                В стоимость входит:
              </Typography>
              {mainServiceForm.includes.map((item, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Пункт ${index + 1}`}
                  value={item}
                  onChange={(e) => {
                    const newIncludes = [...mainServiceForm.includes];
                    newIncludes[index] = e.target.value;
                    setMainServiceForm({ ...mainServiceForm, includes: newIncludes });
                  }}
                  sx={{ mb: 1 }}
                />
              ))}
              <Button
                variant="outlined"
                onClick={() => setMainServiceForm({ 
                  ...mainServiceForm, 
                  includes: [...mainServiceForm.includes, ''] 
                })}
              >
                Добавить пункт
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Дополнительные расходы:
              </Typography>
              {mainServiceForm.additionalCosts.map((cost, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Услуга"
                        value={cost.service}
                        onChange={(e) => {
                          const newCosts = [...mainServiceForm.additionalCosts];
                          newCosts[index].service = e.target.value;
                          setMainServiceForm({ ...mainServiceForm, additionalCosts: newCosts });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Стоимость"
                        value={cost.cost}
                        onChange={(e) => {
                          const newCosts = [...mainServiceForm.additionalCosts];
                          newCosts[index].cost = e.target.value;
                          setMainServiceForm({ ...mainServiceForm, additionalCosts: newCosts });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Примечание"
                        value={cost.note}
                        onChange={(e) => {
                          const newCosts = [...mainServiceForm.additionalCosts];
                          newCosts[index].note = e.target.value;
                          setMainServiceForm({ ...mainServiceForm, additionalCosts: newCosts });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() => setMainServiceForm({ 
                  ...mainServiceForm, 
                  additionalCosts: [...mainServiceForm.additionalCosts, { service: '', cost: '', note: '' }] 
                })}
              >
                Добавить расход
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setMainServiceDialog({ open: false, editing: null })}
            disabled={saving}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleMainServiceSave}
            variant="contained"
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог дополнительной услуги */}
      <Dialog 
        open={additionalServiceDialog.open} 
        onClose={() => setAdditionalServiceDialog({ open: false, editing: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {additionalServiceDialog.editing ? 'Редактировать дополнительную услугу' : 'Добавить дополнительную услугу'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название услуги"
                value={additionalServiceForm.name}
                onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Описание"
                multiline
                rows={3}
                value={additionalServiceForm.description}
                onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Стоимость"
                type="number"
                value={additionalServiceForm.cost}
                onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, cost: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Единица измерения"
                value={additionalServiceForm.unit}
                onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, unit: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Примечание"
                value={additionalServiceForm.note}
                onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, note: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setAdditionalServiceDialog({ open: false, editing: null })}
            disabled={saving}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleAdditionalServiceSave}
            variant="contained"
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог способов оплаты */}
      <Dialog 
        open={paymentMethodsDialog.open} 
        onClose={() => setPaymentMethodsDialog({ open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Редактировать способы оплаты</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Введите способы оплаты (каждый с новой строки):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={paymentMethodsForm.map(m => m.method).join('\n')}
            onChange={(e) => {
              const methods = e.target.value.split('\n').filter(m => m.trim() !== '').map((method, index) => ({
                id: paymentMethodsForm[index]?.id || index,
                method: method.trim()
              }));
              setPaymentMethodsForm(methods);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setPaymentMethodsDialog({ open: false })}
            disabled={saving}
          >
            Отмена
          </Button>
          <Button 
            onClick={handlePaymentMethodsSave}
            variant="contained"
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог графика оплаты */}
      <Dialog 
        open={paymentScheduleDialog.open} 
        onClose={() => setPaymentScheduleDialog({ open: false })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать график оплаты</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Настройте этапы оплаты:
          </Typography>
          {paymentScheduleForm.map((payment, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Сумма"
                    value={payment.amount}
                    onChange={(e) => {
                      const newSchedule = [...paymentScheduleForm];
                      newSchedule[index].amount = e.target.value;
                      setPaymentScheduleForm(newSchedule);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Этап"
                    value={payment.stage}
                    onChange={(e) => {
                      const newSchedule = [...paymentScheduleForm];
                      newSchedule[index].stage = e.target.value;
                      setPaymentScheduleForm(newSchedule);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Примечание"
                    value={payment.note}
                    onChange={(e) => {
                      const newSchedule = [...paymentScheduleForm];
                      newSchedule[index].note = e.target.value;
                      setPaymentScheduleForm(newSchedule);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => setPaymentScheduleForm([...paymentScheduleForm, { id: Date.now(), amount: '', stage: '', note: '' }])}
            sx={{ mt: 1 }}
          >
            Добавить этап
          </Button>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setPaymentScheduleDialog({ open: false })}
            disabled={saving}
          >
            Отмена
          </Button>
          <Button 
            onClick={handlePaymentScheduleSave}
            variant="contained"
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог скидок */}
      <Dialog 
        open={discountsDialog.open} 
        onClose={() => setDiscountsDialog({ open: false })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать скидки</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Настройте скидки для различных категорий:
          </Typography>
          {discountsForm.map((discount, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Размер скидки"
                    value={discount.discount}
                    onChange={(e) => {
                      const newDiscounts = [...discountsForm];
                      newDiscounts[index].discount = e.target.value;
                      setDiscountsForm(newDiscounts);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Категория"
                    value={discount.category}
                    onChange={(e) => {
                      const newDiscounts = [...discountsForm];
                      newDiscounts[index].category = e.target.value;
                      setDiscountsForm(newDiscounts);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Примечание"
                    value={discount.note}
                    onChange={(e) => {
                      const newDiscounts = [...discountsForm];
                      newDiscounts[index].note = e.target.value;
                      setDiscountsForm(newDiscounts);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => setDiscountsForm([...discountsForm, { id: Date.now(), discount: '', category: '', note: '' }])}
            sx={{ mt: 1 }}
          >
            Добавить скидку
          </Button>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDiscountsDialog({ open: false })}
            disabled={saving}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleDiscountsSave}
            variant="contained"
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог информации о договоре */}
      <Dialog 
        open={contractInfoDialog.open} 
        onClose={() => setContractInfoDialog({ open: false })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать информацию о договоре</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL шаблона договора"
                value={contractInfoForm.templateUrl}
                onChange={(e) => setContractInfoForm({ ...contractInfoForm, templateUrl: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Необходимые документы:
              </Typography>
              {contractInfoForm.requiredDocuments.map((doc, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Документ ${index + 1}`}
                  value={doc}
                  onChange={(e) => {
                    const newDocs = [...contractInfoForm.requiredDocuments];
                    newDocs[index] = e.target.value;
                    setContractInfoForm({ ...contractInfoForm, requiredDocuments: newDocs });
                  }}
                  sx={{ mb: 1 }}
                />
              ))}
              <Button
                variant="outlined"
                onClick={() => setContractInfoForm({ 
                  ...contractInfoForm, 
                  requiredDocuments: [...contractInfoForm.requiredDocuments, ''] 
                })}
              >
                Добавить документ
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setContractInfoDialog({ open: false })}
            disabled={saving}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleContractInfoSave}
            variant="contained"
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ServicesManagement; 