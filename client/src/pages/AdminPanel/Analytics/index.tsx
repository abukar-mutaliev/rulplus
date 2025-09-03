import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Analytics,
  ArrowBack,
  TrendingUp,
  TrendingDown,
  People,
  School,
  DirectionsCar,
  Assignment,
  AttachMoney,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface MonthlyData {
  month: string;
  students: number;
  completed: number;
  revenue: number;
  exams: number;
  passRate: number;
}

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  // Моковые данные для аналитики
  useEffect(() => {
    const mockData: MonthlyData[] = [
      { month: 'Январь', students: 45, completed: 32, revenue: 480000, exams: 35, passRate: 85 },
      { month: 'Февраль', students: 52, completed: 38, revenue: 570000, exams: 40, passRate: 90 },
      { month: 'Март', students: 48, completed: 35, revenue: 525000, exams: 38, passRate: 87 },
      { month: 'Апрель', students: 55, completed: 42, revenue: 630000, exams: 45, passRate: 92 },
      { month: 'Май', students: 60, completed: 47, revenue: 705000, exams: 50, passRate: 88 },
      { month: 'Июнь', students: 58, completed: 45, revenue: 690000, exams: 48, passRate: 91 }
    ];
    setMonthlyData(mockData);
  }, []);

  // Расчет общей статистики
  const totalStats = {
    totalStudents: monthlyData.reduce((sum, m) => sum + m.students, 0),
    totalCompleted: monthlyData.reduce((sum, m) => sum + m.completed, 0),
    totalRevenue: monthlyData.reduce((sum, m) => sum + m.revenue, 0),
    avgPassRate: Math.round(monthlyData.reduce((sum, m) => sum + m.passRate, 0) / monthlyData.length),
    totalExams: monthlyData.reduce((sum, m) => sum + m.exams, 0)
  };

  // Данные для топ инструкторов
  const topInstructors = [
    { name: 'Иванов И.И.', students: 32, rating: 4.8, completionRate: 95 },
    { name: 'Петрова А.С.', students: 28, rating: 4.7, completionRate: 92 },
    { name: 'Сидоров П.А.', students: 25, rating: 4.6, completionRate: 88 },
    { name: 'Козлова М.Д.', students: 22, rating: 4.5, completionRate: 85 }
  ];

  // Популярные курсы
  const popularCourses = [
    { course: 'Категория B', students: 180, percentage: 75 },
    { course: 'Категория A', students: 35, percentage: 15 },
    { course: 'Категория C', students: 18, percentage: 7 },
    { course: 'Категория D', students: 7, percentage: 3 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Аналитика - РУЛЬ+ Админ</title>
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
            <Analytics sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Аналитика и отчеты
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Статистика работы автошколы и анализ показателей
              </Typography>
            </Box>
          </Box>
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Период</InputLabel>
            <Select
              value={selectedPeriod}
              label="Период"
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <MenuItem value="2024">2024 год</MenuItem>
              <MenuItem value="2023">2023 год</MenuItem>
              <MenuItem value="quarter">Квартал</MenuItem>
              <MenuItem value="month">Месяц</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Основная статистика */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Всего студентов
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {totalStats.totalStudents}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                      <Typography variant="body2" color="success.main">
                        +12% к прошлому периоду
                      </Typography>
                    </Box>
                  </Box>
                  <People sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Завершили курс
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {totalStats.totalCompleted}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                      <Typography variant="body2" color="success.main">
                        +8% к прошлому периоду
                      </Typography>
                    </Box>
                  </Box>
                  <School sx={{ fontSize: 48, color: 'success.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Доходы
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {formatCurrency(totalStats.totalRevenue)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                      <Typography variant="body2" color="success.main">
                        +15% к прошлому периоду
                      </Typography>
                    </Box>
                  </Box>
                  <AttachMoney sx={{ fontSize: 48, color: 'success.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Средняя сдача
                    </Typography>
                    <Typography variant="h4" color="warning.main">
                      {totalStats.avgPassRate}%
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingDown sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                      <Typography variant="body2" color="error.main">
                        -2% к прошлому периоду
                      </Typography>
                    </Box>
                  </Box>
                  <Assignment sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Помесячная статистика */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Помесячная статистика
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Месяц</TableCell>
                      <TableCell align="right">Студенты</TableCell>
                      <TableCell align="right">Завершили</TableCell>
                      <TableCell align="right">Доходы</TableCell>
                      <TableCell align="right">Сдача (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyData.map((row) => (
                      <TableRow key={row.month} hover>
                        <TableCell>{row.month}</TableCell>
                        <TableCell align="right">{row.students}</TableCell>
                        <TableCell align="right">{row.completed}</TableCell>
                        <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {row.passRate}%
                            </Typography>
                            {row.passRate >= 90 ? (
                              <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                            ) : row.passRate >= 80 ? (
                              <CheckCircle sx={{ fontSize: 16, color: 'warning.main' }} />
                            ) : (
                              <Cancel sx={{ fontSize: 16, color: 'error.main' }} />
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Боковая панель с дополнительной статистикой */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Топ инструкторы */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Топ инструкторы
                  </Typography>
                  <List dense>
                    {topInstructors.map((instructor, index) => (
                      <div key={instructor.name}>
                        <ListItem>
                          <ListItemIcon>
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 12,
                                fontWeight: 'bold'
                              }}
                            >
                              {index + 1}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={instructor.name}
                            secondary={
                              <Box>
                                <Typography variant="body2">
                                  Студентов: {instructor.students}
                                </Typography>
                                <Typography variant="body2">
                                  Рейтинг: {instructor.rating} ⭐
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={instructor.completionRate}
                                  sx={{ mt: 0.5, height: 4 }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < topInstructors.length - 1 && <Divider />}
                      </div>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Популярные курсы */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Популярные курсы
                  </Typography>
                  <List dense>
                    {popularCourses.map((course, index) => (
                      <div key={course.course}>
                        <ListItem>
                          <ListItemText
                            primary={course.course}
                            secondary={
                              <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="body2">
                                    {course.students} студентов
                                  </Typography>
                                  <Typography variant="body2">
                                    {course.percentage}%
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={course.percentage}
                                  sx={{ height: 6, borderRadius: 3 }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < popularCourses.length - 1 && <Divider />}
                      </div>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AnalyticsDashboard; 