import { Container, Typography, Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Alert, Button, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { People, EventNote, School, TrendingUp, CheckCircle, Phone } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import ApplicationForm from './ApplicationForm';
import { servicesApi, IMainService } from '../../../shared/api/servicesApi';

const VacanciesPage = () => {
  const [applicationFormOpen, setApplicationFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [programs, setPrograms] = useState<IMainService[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка программ из API
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const response = await servicesApi.getServices();
        if (response.mainServices && response.mainServices.length > 0) {
          setPrograms(response.mainServices);
        } else {
          // Fallback данные
          setPrograms([
            {
              id: 1,
              category: 'B',
              name: 'Профессиональная подготовка водителей транспортных средств категории "B"',
              description: 'Базовый курс для получения водительских прав категории B',
              duration: '2.5 месяца',
              cost: 35000,
              includes: ['Теоретическое обучение', 'Практические занятия', 'Внутренний экзамен'],
              additionalCosts: []
            },
            {
              id: 2,
              category: 'A',
              name: 'Профессиональная подготовка водителей транспортных средств категории "A"',
              description: 'Обучение вождению мотоциклов и мотороллеров',
              duration: '2 месяца',
              cost: 25000,
              includes: ['Теоретическое обучение', 'Практические занятия'],
              additionalCosts: []
            },
            {
              id: 3,
              category: 'C',
              name: 'Профессиональная подготовка водителей транспортных средств категории "C"',
              description: 'Профессиональная подготовка водителей грузовиков',
              duration: '3 месяца',
              cost: 45000,
              includes: ['Теоретическое обучение', 'Практические занятия', 'Специализированные навыки'],
              additionalCosts: []
            }
          ]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке программ:', error);
        // Fallback данные при ошибке
        setPrograms([
          {
            id: 1,
            category: 'B',
            name: 'Профессиональная подготовка водителей транспортных средств категории "B"',
            description: 'Базовый курс для получения водительских прав категории B',
            duration: '2.5 месяца',
            cost: 35000,
            includes: ['Теоретическое обучение', 'Практические занятия', 'Внутренний экзамен'],
            additionalCosts: []
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  // Данные для вакансий с использованием программ из API
  const vacanciesData = {
    currentPeriod: '2024 учебный год',
    lastUpdated: new Date().toISOString(),
    programs: programs.map((program, index) => ({
      id: program.id || index + 1,
      category: program.category,
      name: program.name,
      totalPlaces: program.category === 'B' ? 120 : program.category === 'A' ? 40 : 60,
      occupiedPlaces: program.category === 'B' ? 85 : program.category === 'A' ? 28 : 42,
      vacantPlaces: program.category === 'B' ? 35 : program.category === 'A' ? 12 : 18,
      duration: program.duration,
      cost: program.cost,
      startDates: program.category === 'B'
        ? ['2024-03-15', '2024-04-01', '2024-04-15', '2024-05-01']
        : program.category === 'A'
        ? ['2024-04-01', '2024-05-15', '2024-07-01']
        : ['2024-04-01', '2024-05-01', '2024-06-01'],
      schedule: program.category === 'B'
        ? 'Утренние и вечерние группы'
        : program.category === 'A'
        ? 'Сезонные группы (март-октябрь)'
        : 'Утренние и вечерние группы'
    })),
    admissionRequirements: [
      'Достижение установленного возраста (16 лет для категории A, 17 лет для категории B, 18 лет для категории C)',
      'Медицинская справка установленного образца',
      'Документ, удостоверяющий личность',
      'Справка о несудимости (для категории C)',
      'Заключение договора и оплата обучения'
    ],
    documents: [
      'Паспорт гражданина РФ или иной документ, удостоверяющий личность',
      'Медицинская справка формы 003-В/у',
      'Фотографии 3x4 см (4 шт.)',
      'СНИЛС',
      'Справка о несудимости (для кат. C)'
    ],
    admissionProcedure: [
      'Подача заявления и документов',
      'Заключение договора на оказание образовательных услуг',
      'Оплата обучения (возможна рассрочка)',
      'Формирование учебной группы',
      'Начало обучения согласно расписанию'
    ],
    contacts: {
      phone: '+7 (928) 697-06-97',
      email: 'amurklan@mail.ru',
      address: '123456, г. Назрань, ул. Примерная, д. 123, оф. 45',
      workTime: 'Пн-Пт: 09:00-18:00, Сб: 10:00-16:00'
    }
  };

  const getOccupancyColor = (vacantPlaces: number, totalPlaces: number) => {
    const percentage = (vacantPlaces / totalPlaces) * 100;
    if (percentage > 50) return 'success';
    if (percentage > 20) return 'warning';
    return 'error';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const handleApplyForTraining = (program: any) => {
    setSelectedProgram(program);
    setApplicationFormOpen(true);
  };

  const handleCloseApplicationForm = () => {
    setApplicationFormOpen(false);
    setSelectedProgram(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Загрузка информации о вакансиях...</Typography>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Вакантные места для приема - Автошкола Драйв</title>
        <meta 
          name="description" 
          content="Вакантные места для приема на обучение в автошколе: количество свободных мест по программам подготовки водителей категорий A, B, C." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Вакантные места для приема обучающихся
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Информация о количестве вакантных мест для приема на обучение по образовательным программам 
            профессиональной подготовки водителей транспортных средств
          </Typography>
        </Box>

        {/* Информационный блок */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Учебный период:</strong> {vacanciesData.currentPeriod}
          </Typography>
          <Typography variant="body2">
            Данные обновляются еженедельно. Последнее обновление: {formatDate(vacanciesData.lastUpdated)}
          </Typography>
        </Alert>

        {/* Детальная информация по программам */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Вакантные места по образовательным программам
              </Typography>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Категория</strong></TableCell>
                    <TableCell><strong>Стоимость</strong></TableCell>
                    <TableCell><strong>Длительность</strong></TableCell>
                    <TableCell><strong>Статус</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vacanciesData.programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell>
                        <Chip label={program.category} color="primary" />
                      </TableCell>

                      <TableCell>{program.cost.toLocaleString('ru-RU')} ₽</TableCell>
                      <TableCell>{program.duration}</TableCell>
                      <TableCell>
                        <Chip 
                          label={program.vacantPlaces > 0 ? 'Набор открыт' : 'Места закончились'}
                          color={program.vacantPlaces > 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Программы и даты начала */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {vacanciesData.programs.map((program) => (
            <Grid item xs={12} md={4} key={program.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip label={`Категория ${program.category}`} color="primary" sx={{ mr: 2 }} />

                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {program.name}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Длительность:</strong> {program.duration}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Стоимость:</strong> {program.cost.toLocaleString('ru-RU')} ₽
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Расписание:</strong> {program.schedule}
                    </Typography>
                  </Box>

                  <Typography variant="body2" gutterBottom>
                    <strong>Ближайшие даты начала обучения:</strong>
                  </Typography>
                  <Box sx={{ pl: 2, mb: 2 }}>
                    {program.startDates.slice(0, 3).map((date, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {formatDate(date)}
                      </Typography>
                    ))}
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth 
                    disabled={program.vacantPlaces === 0}
                    sx={{ mt: 'auto' }}
                    onClick={() => handleApplyForTraining(program)}
                  >
                    {program.vacantPlaces > 0 ? 'Записаться на обучение' : 'Места закончились'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Условия приема */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircle sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Требования для поступления
                  </Typography>
                </Box>

                {vacanciesData.admissionRequirements.map((requirement, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {requirement}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EventNote sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Необходимые документы
                  </Typography>
                </Box>

                {vacanciesData.documents.map((document, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {document}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Порядок поступления */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <People sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Порядок поступления
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {vacanciesData.admissionProcedure.map((step, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ 
                    p: 2, 
                    border: 2, 
                    borderColor: 'primary.main', 
                    borderRadius: 2,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      {index + 1}
                    </Typography>
                    <Typography variant="body2">
                      {step}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Контактная информация */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Phone sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Контактная информация для поступающих
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Телефон приемной комиссии:</strong>
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {vacanciesData.contacts.phone}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Электронная почта:</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {vacanciesData.contacts.email}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Адрес:</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {vacanciesData.contacts.address}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Время работы приемной комиссии:</strong>
                </Typography>
                <Typography variant="body1">
                  {vacanciesData.contacts.workTime}
                </Typography>
              </Grid>
            </Grid>

            <Alert severity="success" sx={{ mt: 3 }}>
              <Typography variant="body2">
                📞 <strong>Консультации по телефону:</strong> Наши специалисты готовы ответить на все ваши вопросы 
                о поступлении, программах обучения и условиях оплаты.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* Дата обновления */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Дата последнего обновления информации: {formatDate(vacanciesData.lastUpdated)}
          </Typography>
        </Box>
      </Container>

      {/* Application Form Dialog */}
      <ApplicationForm
        open={applicationFormOpen}
        onClose={handleCloseApplicationForm}
        program={selectedProgram}
      />
    </>
  );
};

export default VacanciesPage; 