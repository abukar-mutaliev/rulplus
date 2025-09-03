import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Settings,
  ArrowBack,
  Save,
  RestoreFromTrash,
  Security,
  Notifications,
  Visibility,
  VisibilityOff,
  Lock,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SystemSettings = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  
  // Состояние для изменения пароля
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordError, setPasswordError] = useState('');
  
  // Основные настройки
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'РУЛЬ+',
    slogan: 'СЕЛ — ПОЕХАЛ',
    address: 'г. Назрань, ул. Московская, 123',
    phone: '+79286970697',
    email: 'info@rulplus.ru',
    website: 'https://rulplus.ru',
    workingHours: '9:00 - 18:00',
    timezone: 'Europe/Moscow'
  });

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    examReminders: true,
    paymentReminders: true,
    maintenanceAlerts: true
  });

  // Настройки безопасности
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    twoFactorAuth: false,
    loginAttempts: 5,
    ipWhitelist: false
  });

  // Настройки курсов
  const [courseSettings, setCourseSettings] = useState({
    theoryHours: 40,
    practiceHours: 20,
    examAttempts: 3,
    certificateValidityDays: 365,
    minAge: 18,
    maxStudentsPerInstructor: 15
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    setSaveMessage('Настройки успешно сохранены!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    // Логика сброса настроек к значениям по умолчанию
    if (window.confirm('Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?')) {
      setSaveMessage('Настройки сброшены к значениям по умолчанию');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Функции для изменения пароля
  const handlePasswordChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setPasswordError('');
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    
    // Валидация
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Все поля должны быть заполнены');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Новые пароли не совпадают');
      return;
    }

    if (passwordData.newPassword.length < securitySettings.passwordMinLength) {
      setPasswordError(`Пароль должен содержать минимум ${securitySettings.passwordMinLength} символов`);
      return;
    }

    if (securitySettings.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
      setPasswordError('Пароль должен содержать специальные символы');
      return;
    }

    // Проверка текущего пароля (в реальном приложении это будет API запрос)
    if (passwordData.currentPassword !== 'rulplus2024') {
      setPasswordError('Неверный текущий пароль');
      return;
    }

    try {
      // Симуляция API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном приложении здесь будет обновление пароля в базе данных
      setPasswordChangeMessage('Пароль успешно изменен!');
      setPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setTimeout(() => setPasswordChangeMessage(''), 3000);
    } catch (error) {
      setPasswordError('Ошибка при изменении пароля. Попробуйте снова.');
    }
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
  };

  return (
    <>
      <Helmet>
        <title>Настройки системы - РУЛЬ+ Админ</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
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
            <Settings sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Настройки системы
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Конфигурация и управление системой автошколы
              </Typography>
            </Box>
          </Box>
          
          <Box>
            <Button
              variant="outlined"
              startIcon={<RestoreFromTrash />}
              onClick={handleReset}
              sx={{ mr: 2 }}
            >
              Сбросить
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </Box>
        </Box>

        {/* Уведомление о сохранении */}
        {saveMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {saveMessage}
          </Alert>
        )}

        {/* Уведомление об изменении пароля */}
        {passwordChangeMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {passwordChangeMessage}
          </Alert>
        )}

        {/* Вкладки */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Общие" />
            <Tab label="Уведомления" />
            <Tab label="Безопасность" />
            <Tab label="Курсы" />
            <Tab label="Интеграции" />
          </Tabs>
        </Box>

        {/* Общие настройки */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Основная информация
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Название автошколы"
                        value={generalSettings.schoolName}
                        onChange={(e) => setGeneralSettings({...generalSettings, schoolName: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Слоган"
                        value={generalSettings.slogan}
                        onChange={(e) => setGeneralSettings({...generalSettings, slogan: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Адрес"
                        multiline
                        rows={2}
                        value={generalSettings.address}
                        onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Телефон"
                        value={generalSettings.phone}
                        onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Рабочие параметры
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Веб-сайт"
                        value={generalSettings.website}
                        onChange={(e) => setGeneralSettings({...generalSettings, website: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Рабочие часы"
                        value={generalSettings.workingHours}
                        onChange={(e) => setGeneralSettings({...generalSettings, workingHours: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Часовой пояс</InputLabel>
                        <Select
                          value={generalSettings.timezone}
                          label="Часовой пояс"
                          onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                        >
                          <MenuItem value="Europe/Moscow">Москва (GMT+3)</MenuItem>
                          <MenuItem value="Europe/Samara">Самара (GMT+4)</MenuItem>
                          <MenuItem value="Asia/Yekaterinburg">Екатеринбург (GMT+5)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Настройки уведомлений */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Типы уведомлений
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Email уведомления" secondary="Отправка писем на электронную почту" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="SMS уведомления" secondary="Отправка SMS сообщений" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Push уведомления" secondary="Уведомления в браузере" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    События для уведомлений
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Напоминания об экзаменах" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notificationSettings.examReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, examReminders: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Напоминания об оплате" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notificationSettings.paymentReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, paymentReminders: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Уведомления о ТО автомобилей" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notificationSettings.maintenanceAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, maintenanceAlerts: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Настройки безопасности */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Политики безопасности
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Время сессии (минуты)"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Минимальная длина пароля"
                        type="number"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Максимум попыток входа"
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Дополнительная защита
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Требовать специальные символы в пароле" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={securitySettings.requireSpecialChars}
                          onChange={(e) => setSecuritySettings({...securitySettings, requireSpecialChars: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Двухфакторная аутентификация" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Белый список IP адресов" />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={securitySettings.ipWhitelist}
                          onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.checked})}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Кнопка изменения пароля */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <Lock sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Изменение пароля администратора
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Измените пароль для входа в админ-панель. Рекомендуется использовать сложный пароль.
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<Lock />}
                      onClick={() => setPasswordDialogOpen(true)}
                      sx={{ minWidth: 200 }}
                    >
                      Изменить пароль
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Настройки курсов */}
        {tabValue === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Параметры обучения
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Часы теории"
                        type="number"
                        value={courseSettings.theoryHours}
                        onChange={(e) => setCourseSettings({...courseSettings, theoryHours: parseInt(e.target.value)})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Часы практики"
                        type="number"
                        value={courseSettings.practiceHours}
                        onChange={(e) => setCourseSettings({...courseSettings, practiceHours: parseInt(e.target.value)})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Попытки сдачи экзамена"
                        type="number"
                        value={courseSettings.examAttempts}
                        onChange={(e) => setCourseSettings({...courseSettings, examAttempts: parseInt(e.target.value)})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Минимальный возраст"
                        type="number"
                        value={courseSettings.minAge}
                        onChange={(e) => setCourseSettings({...courseSettings, minAge: parseInt(e.target.value)})}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Ограничения и сроки
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Срок действия справки (дни)"
                        type="number"
                        value={courseSettings.certificateValidityDays}
                        onChange={(e) => setCourseSettings({...courseSettings, certificateValidityDays: parseInt(e.target.value)})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Макс. студентов на инструктора"
                        type="number"
                        value={courseSettings.maxStudentsPerInstructor}
                        onChange={(e) => setCourseSettings({...courseSettings, maxStudentsPerInstructor: parseInt(e.target.value)})}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Интеграции */}
        {tabValue === 4 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Внешние интеграции
                  </Typography>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Здесь можно настроить интеграции с внешними сервисами: платежные системы, SMS-сервисы, 
                    электронная отчетность и др.
                  </Alert>
                  <Typography variant="body1" color="text.secondary">
                    Функционал интеграций будет добавлен в следующих версиях системы.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Диалог изменения пароля */}
      <Dialog open={passwordDialogOpen} onClose={handleClosePasswordDialog}>
        <DialogTitle>Изменение пароля администратора</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Текущий пароль"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange('currentPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => togglePasswordVisibility('current')} edge="end">
                        {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Новый пароль"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={handlePasswordChange('newPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => togglePasswordVisibility('new')} edge="end">
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Подтверждение нового пароля"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange('confirmPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => togglePasswordVisibility('confirm')} edge="end">
                        {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {passwordError && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 2 }}>{passwordError}</Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleChangePassword} variant="contained" color="primary">
            Изменить пароль
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SystemSettings; 