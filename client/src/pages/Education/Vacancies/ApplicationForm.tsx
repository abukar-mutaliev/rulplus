import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { Close, Send, Person, Phone, Email, School } from '@mui/icons-material';
import { servicesApi, IMainService } from '../../../shared/api/servicesApi';

interface ApplicationFormProps {
  open: boolean;
  onClose: () => void;
  program?: {
    id: number;
    category: string;
    name: string;
    cost: number;
    duration: string;
  };
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  birthDate: string;
  programId: number;
  preferredStartDate: string;
  additionalInfo: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ open, onClose, program }) => {
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    birthDate: '',
    programId: program?.id || 0,
    preferredStartDate: '',
    additionalInfo: ''
  });

  const [programs, setPrograms] = useState<IMainService[]>([]);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationData>>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Загрузка программ из API
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setProgramsLoading(true);
        const response = await servicesApi.getServices();
        if (response.mainServices && response.mainServices.length > 0) {
          setPrograms(response.mainServices);
        } else {
          // Fallback данные
          setPrograms([
            { id: 1, category: 'B', name: 'Категория B - Легковые автомобили', cost: 35000 },
            { id: 2, category: 'A', name: 'Категория A - Мотоциклы', cost: 25000 },
            { id: 3, category: 'C', name: 'Категория C - Грузовые автомобили', cost: 45000 }
          ]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке программ:', error);
        // Fallback данные при ошибке
        setPrograms([
          { id: 1, category: 'B', name: 'Категория B - Легковые автомобили', cost: 35000 }
        ]);
      } finally {
        setProgramsLoading(false);
      }
    };

    if (open) {
      loadPrograms();
    }
  }, [open]);

  const handleInputChange = (field: keyof ApplicationData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.value as string;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ApplicationData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Обязательное поле';
    if (!formData.lastName.trim()) newErrors.lastName = 'Обязательное поле';
    if (!formData.phone.trim()) newErrors.phone = 'Обязательное поле';
    if (!formData.email.trim()) newErrors.email = 'Обязательное поле';
    if (!formData.birthDate) newErrors.birthDate = 'Обязательное поле';
    if (!formData.programId) newErrors.programId = 'Выберите программу обучения';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    // Phone validation (Russian format)
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/applications/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' });
        setTimeout(() => {
          onClose();
          setFormData({
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            email: '',
            birthDate: '',
            programId: program?.id || 0,
            preferredStartDate: '',
            additionalInfo: ''
          });
          setSubmitMessage(null);
        }, 3000);
      } else {
        setSubmitMessage({ type: 'error', text: result.message || 'Ошибка при отправке заявки. Попробуйте снова.' });
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      setSubmitMessage({ type: 'error', text: 'Ошибка соединения. Проверьте интернет-соединение и попробуйте снова.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        birthDate: '',
        programId: program?.id || 0,
        preferredStartDate: '',
        additionalInfo: ''
      });
      setErrors({});
      setSubmitMessage(null);
    }
  };



  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <School sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Заявка на обучение</Typography>
        </Box>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{ minWidth: 'auto', p: 0.5 }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {submitMessage && (
          <Alert severity={submitMessage.type} sx={{ mb: 3 }}>
            {submitMessage.text}
          </Alert>
        )}

        {program && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Выбранная программа:</strong>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip label={`Категория ${program.category}`} color="primary" size="small" />
              <Typography variant="body2" color="text.primary">
                {program.cost.toLocaleString('ru-RU')} ₽
              </Typography>
            </Box>
            <Typography variant="body2" color="text.primary">
              {program.name}
            </Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1, fontSize: '1.2rem' }} />
              Личные данные
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Фамилия *"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Имя *"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Отчество"
              value={formData.middleName}
              onChange={handleInputChange('middleName')}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Дата рождения *"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange('birthDate')}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              disabled={loading}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.programId} disabled={loading}>
              <InputLabel>Программа обучения *</InputLabel>
              <Select
                value={formData.programId}
                onChange={handleInputChange('programId')}
                label="Программа обучения *"
              >
                {programs.map((prog) => (
                  <MenuItem key={prog.id || prog.category} value={prog.id || prog.category}>
                    {prog.name} ({prog.cost.toLocaleString('ru-RU')} ₽)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Phone sx={{ mr: 1, fontSize: '1.2rem' }} />
              Контактная информация
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Телефон *"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone || 'Формат: +7 (999) 123-45-67'}
              disabled={loading}
              placeholder="+7 (999) 123-45-67"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Желаемая дата начала обучения"
              type="date"
              value={formData.preferredStartDate}
              onChange={handleInputChange('preferredStartDate')}
              disabled={loading}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Дополнительная информация"
              multiline
              rows={3}
              value={formData.additionalInfo}
              onChange={handleInputChange('additionalInfo')}
              disabled={loading}
              placeholder="Укажите дополнительную информацию, если необходимо..."
            />
          </Grid>
        </Grid>

        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Важно:</strong> После отправки заявки мы свяжемся с вами для уточнения деталей 
            и согласования времени для подачи документов.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          color="inherit"
        >
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
        >
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationForm; 