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
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  School,
  Add,
  Edit,
  Delete,
  ArrowBack,
  Save,
  Cancel,
  Phone,
  Email,
  Assignment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  enrollDate: string;
  status: 'active' | 'completed' | 'suspended' | 'dropped';
  progress: number;
  instructor: string;
  theoryHours: number;
  practiceHours: number;
  totalTheoryHours: number;
  totalPracticeHours: number;
}

const StudentsManagement = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    status: 'active' as 'active' | 'completed' | 'suspended' | 'dropped',
    instructor: '',
    theoryHours: 0,
    practiceHours: 0
  });

  // Моковые данные
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Абдулаев Магомед Русланович',
        phone: '+7928-111-22-33',
        email: 'abdul@example.com',
        course: 'Категория B',
        enrollDate: '2024-01-15',
        status: 'active',
        progress: 75,
        instructor: 'Иванов И.И.',
        theoryHours: 30,
        practiceHours: 15,
        totalTheoryHours: 40,
        totalPracticeHours: 20
      },
      {
        id: '2',
        name: 'Исаева Хава Ахмедовна',
        phone: '+7928-444-55-66',
        email: 'isaeva@example.com',
        course: 'Категория B',
        enrollDate: '2024-02-01',
        status: 'active',
        progress: 45,
        instructor: 'Петрова А.С.',
        theoryHours: 18,
        practiceHours: 8,
        totalTheoryHours: 40,
        totalPracticeHours: 20
      },
      {
        id: '3',
        name: 'Газиев Руслан Мурадович',
        phone: '+7928-777-88-99',
        email: 'gaziev@example.com',
        course: 'Категория B',
        enrollDate: '2023-11-20',
        status: 'completed',
        progress: 100,
        instructor: 'Сидоров П.А.',
        theoryHours: 40,
        practiceHours: 20,
        totalTheoryHours: 40,
        totalPracticeHours: 20
      },
      {
        id: '4',
        name: 'Мурадова Зарема Салманovna',
        phone: '+7928-123-45-67',
        email: 'muradova@example.com',
        course: 'Категория B',
        enrollDate: '2024-01-30',
        status: 'suspended',
        progress: 25,
        instructor: 'Иванов И.И.',
        theoryHours: 10,
        practiceHours: 2,
        totalTheoryHours: 40,
        totalPracticeHours: 20
      }
    ];
    setStudents(mockStudents);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getFilteredStudents = () => {
    switch (tabValue) {
      case 0: return students; // Все
      case 1: return students.filter(s => s.status === 'active');
      case 2: return students.filter(s => s.status === 'completed');
      case 3: return students.filter(s => s.status === 'suspended' || s.status === 'dropped');
      default: return students;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'primary';
      case 'completed': return 'success';
      case 'suspended': return 'warning';
      case 'dropped': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Обучается';
      case 'completed': return 'Завершил';
      case 'suspended': return 'Приостановлен';
      case 'dropped': return 'Отчислен';
      default: return status;
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      phone: student.phone,
      email: student.email,
      course: student.course,
      status: student.status,
      instructor: student.instructor,
      theoryHours: student.theoryHours,
      practiceHours: student.practiceHours
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedStudent) {
      // Обновление существующего студента
      const updatedStudents = students.map(s => 
        s.id === selectedStudent.id 
          ? { 
              ...s, 
              ...formData,
              progress: Math.round(((formData.theoryHours / 40) + (formData.practiceHours / 20)) * 50)
            }
          : s
      );
      setStudents(updatedStudents);
    } else {
      // Создание нового студента
      const newStudent: Student = {
        id: Date.now().toString(),
        ...formData,
        enrollDate: new Date().toISOString().split('T')[0],
        totalTheoryHours: 40,
        totalPracticeHours: 20,
        progress: Math.round(((formData.theoryHours / 40) + (formData.practiceHours / 20)) * 50)
      };
      setStudents([...students, newStudent]);
    }
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
    }
    setIsDeleteDialogOpen(false);
    setSelectedStudent(null);
  };

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    completed: students.filter(s => s.status === 'completed').length,
    avgProgress: Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)
  };

  return (
    <>
      <Helmet>
        <title>Управление студентами - РУЛЬ+ Админ</title>
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
          <School sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Управление студентами
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Управление учащимися автошколы и их прогрессом
            </Typography>
          </Box>
        </Box>

        {/* Статистика */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Всего студентов
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
                  Обучаются
                </Typography>
                <Typography variant="h4" color="primary.main">
                  {stats.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Завершили
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Средний прогресс
                </Typography>
                <Typography variant="h4" color="info.main">
                  {stats.avgProgress}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Вкладки фильтрации */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Все" />
            <Tab label="Обучаются" />
            <Tab label="Завершили" />
            <Tab label="Проблемные" />
          </Tabs>
        </Box>

        {/* Таблица студентов */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Студент</TableCell>
                  <TableCell>Курс</TableCell>
                  <TableCell>Инструктор</TableCell>
                  <TableCell>Прогресс</TableCell>
                  <TableCell>Часы обучения</TableCell>
                  <TableCell>Дата записи</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="center">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredStudents().map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {student.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {student.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.instructor}</TableCell>
                    <TableCell>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {student.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={student.progress}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Теория: {student.theoryHours}/{student.totalTheoryHours}
                      </Typography>
                      <Typography variant="body2">
                        Практика: {student.practiceHours}/{student.totalPracticeHours}
                      </Typography>
                    </TableCell>
                    <TableCell>{student.enrollDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(student.status)} 
                        size="small" 
                        color={getStatusColor(student.status) as any}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(student)}
                        title="Редактировать"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(student)}
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
            setSelectedStudent(null);
            setFormData({
              name: '',
              phone: '',
              email: '',
              course: 'Категория B',
              status: 'active',
              instructor: '',
              theoryHours: 0,
              practiceHours: 0
            });
            setIsEditDialogOpen(true);
          }}
        >
          <Add />
        </Fab>

        {/* Диалог редактирования */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedStudent ? 'Редактировать студента' : 'Добавить нового студента'}
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
                  <FormControl fullWidth>
                    <InputLabel>Курс</InputLabel>
                    <Select
                      value={formData.course}
                      label="Курс"
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    >
                      <MenuItem value="Категория A">Категория A</MenuItem>
                      <MenuItem value="Категория B">Категория B</MenuItem>
                      <MenuItem value="Категория C">Категория C</MenuItem>
                      <MenuItem value="Категория D">Категория D</MenuItem>
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
                      <MenuItem value="active">Обучается</MenuItem>
                      <MenuItem value="completed">Завершил</MenuItem>
                      <MenuItem value="suspended">Приостановлен</MenuItem>
                      <MenuItem value="dropped">Отчислен</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Инструктор"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Часы теории"
                    type="number"
                    value={formData.theoryHours}
                    onChange={(e) => setFormData({ ...formData, theoryHours: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Часы практики"
                    type="number"
                    value={formData.practiceHours}
                    onChange={(e) => setFormData({ ...formData, practiceHours: parseInt(e.target.value) || 0 })}
                  />
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
              Вы уверены, что хотите удалить студента "{selectedStudent?.name}"?
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

export default StudentsManagement; 