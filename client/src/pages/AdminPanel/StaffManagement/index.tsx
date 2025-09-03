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
  Avatar,
  Stack
} from '@mui/material';
import {
  People,
  Add,
  Edit,
  Delete,
  ArrowBack,
  Save,
  Cancel,
  Phone,
  Email,
  Work
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  phone: string;
  email: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'vacation';
  avatar?: string;
  experience: number;
}

const StaffManagement = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    phone: '',
    email: '',
    status: 'active' as 'active' | 'inactive' | 'vacation',
    experience: 0
  });

  // Моковые данные
  useEffect(() => {
    const mockStaff: StaffMember[] = [
      {
        id: '1',
        name: 'Муталиев Амурклан Ибрагимович',
        position: 'Директор',
        department: 'Администрация',
        phone: '+79286970697',
        email: 'amurklan@mail.ru',
        hireDate: '2020-01-15',
        status: 'active',
        experience: 15
      },
      {
        id: '2',
        name: 'Иванов Иван Иванович',
        position: 'Главный инструктор',
        department: 'Обучение',
        phone: '+7928-123-45-67',
        email: 'ivanov@rulplus.ru',
        hireDate: '2021-03-10',
        status: 'active',
        experience: 12
      },
      {
        id: '3',
        name: 'Петрова Анна Сергеевна',
        position: 'Инструктор по теории',
        department: 'Обучение',
        phone: '+7928-987-65-43',
        email: 'petrova@rulplus.ru',
        hireDate: '2022-06-01',
        status: 'active',
        experience: 8
      },
      {
        id: '4',
        name: 'Сидоров Петр Александрович',
        position: 'Инструктор по вождению',
        department: 'Вождение',
        phone: '+7928-555-11-22',
        email: 'sidorov@rulplus.ru',
        hireDate: '2023-01-20',
        status: 'vacation',
        experience: 5
      },
      {
        id: '5',
        name: 'Козлова Мария Дмитриевна',
        position: 'Администратор',
        department: 'Администрация',
        phone: '+7928-333-77-88',
        email: 'kozlova@rulplus.ru',
        hireDate: '2023-09-15',
        status: 'active',
        experience: 3
      }
    ];
    setStaff(mockStaff);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'vacation': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'vacation': return 'В отпуске';
      case 'inactive': return 'Неактивный';
      default: return status;
    }
  };

  const handleEdit = (member: StaffMember) => {
    setSelectedStaff(member);
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      phone: member.phone,
      email: member.email,
      status: member.status,
      experience: member.experience
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (member: StaffMember) => {
    setSelectedStaff(member);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedStaff) {
      // Логика сохранения изменений
      const updatedStaff = staff.map(s => 
        s.id === selectedStaff.id 
          ? { ...s, ...formData }
          : s
      );
      setStaff(updatedStaff);
    } else {
      // Создание нового сотрудника
      const newStaff: StaffMember = {
        id: Date.now().toString(),
        ...formData,
        hireDate: new Date().toISOString().split('T')[0]
      };
      setStaff([...staff, newStaff]);
    }
    setIsEditDialogOpen(false);
    setSelectedStaff(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedStaff) {
      setStaff(staff.filter(s => s.id !== selectedStaff.id));
    }
    setIsDeleteDialogOpen(false);
    setSelectedStaff(null);
  };

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    vacation: staff.filter(s => s.status === 'vacation').length,
    avgExperience: Math.round(staff.reduce((sum, s) => sum + s.experience, 0) / staff.length)
  };

  return (
    <>
      <Helmet>
        <title>Управление персоналом - РУЛЬ+ Админ</title>
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
          <People sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Управление персоналом
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Управление сотрудниками и инструкторами автошколы
            </Typography>
          </Box>
        </Box>

        {/* Статистика */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Всего сотрудников
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
                  В отпуске
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {stats.vacation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Средний стаж (лет)
                </Typography>
                <Typography variant="h4" color="info.main">
                  {stats.avgExperience}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Таблица сотрудников */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Сотрудник</TableCell>
                  <TableCell>Должность</TableCell>
                  <TableCell>Отдел</TableCell>
                  <TableCell>Контакты</TableCell>
                  <TableCell>Дата найма</TableCell>
                  <TableCell>Стаж</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="center">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Phone sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{member.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Email sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{member.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{member.hireDate}</TableCell>
                    <TableCell>{member.experience} лет</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(member.status)} 
                        size="small" 
                        color={getStatusColor(member.status) as any}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(member)}
                        title="Редактировать"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(member)}
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
            setSelectedStaff(null);
            setFormData({
              name: '',
              position: '',
              department: '',
              phone: '',
              email: '',
              status: 'active',
              experience: 0
            });
            setIsEditDialogOpen(true);
          }}
        >
          <Add />
        </Fab>

        {/* Диалог редактирования */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedStaff ? 'Редактировать сотрудника' : 'Добавить нового сотрудника'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="ФИО"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Должность"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Отдел</InputLabel>
                    <Select
                      value={formData.department}
                      label="Отдел"
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <MenuItem value="Администрация">Администрация</MenuItem>
                      <MenuItem value="Обучение">Обучение</MenuItem>
                      <MenuItem value="Вождение">Вождение</MenuItem>
                      <MenuItem value="Техническая служба">Техническая служба</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Стаж работы (лет)"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      value={formData.status}
                      label="Статус"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <MenuItem value="active">Активный</MenuItem>
                      <MenuItem value="vacation">В отпуске</MenuItem>
                      <MenuItem value="inactive">Неактивный</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
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
              Вы уверены, что хотите удалить сотрудника "{selectedStaff?.name}"?
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

export default StaffManagement; 