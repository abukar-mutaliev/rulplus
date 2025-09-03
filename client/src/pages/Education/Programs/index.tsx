import { Container, Typography, Box, Card, CardContent, Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Button, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { School, DirectionsCar, LocalShipping, Schedule, People, Description, GetApp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { servicesApi, IMainService } from '../../../shared/api/servicesApi';

const ProgramsPage = () => {
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
              description: 'Программа подготовки водителей легковых автомобилей и небольших грузовиков',
              duration: '2.5 месяца',
              cost: 35000,
              includes: ['Теоретическое обучение', 'Практические занятия', 'Внутренний экзамен'],
              additionalCosts: []
            },
            {
              id: 2,
              category: 'A',
              name: 'Профессиональная подготовка водителей транспортных средств категории "A"',
              description: 'Программа подготовки водителей мотоциклов',
              duration: '2 месяца',
              cost: 25000,
              includes: ['Теоретическое обучение', 'Практические занятия'],
              additionalCosts: []
            },
            {
              id: 3,
              category: 'C',
              name: 'Профессиональная подготовка водителей транспортных средств категории "C"',
              description: 'Программа подготовки водителей грузовых автомобилей',
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
            description: 'Программа подготовки водителей легковых автомобилей и небольших грузовиков',
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

  // Статические данные для образовательных программ
  const educationPrograms = {
    general: {
      level: 'Профессиональное обучение',
      form: 'Очная',
      language: 'Русский',
      accreditation: 'Не требуется для программ профессионального обучения',
      adaptedPrograms: 'Отсутствуют'
    },
    programs: programs.map((program, index) => ({
      id: program.id || index + 1,
      category: program.category,
      name: program.name,
      description: program.description,
      duration: {
        total: program.category === 'B' ? 190 : program.category === 'A' ? 130 : 250,
        theory: program.category === 'B' ? 130 : program.category === 'A' ? 108 : 162,
        practice: program.category === 'B' ? 56 : program.category === 'A' ? 18 : 84,
        exam: 4
      },
      students: {
        current: program.category === 'B' ? 45 : program.category === 'A' ? 12 : 18,
        graduated2023: program.category === 'B' ? 156 : program.category === 'A' ? 34 : 67,
        graduated2022: program.category === 'B' ? 142 : program.category === 'A' ? 28 : 71
      },
      cost: program.cost,
      minAge: program.category === 'B' ? 17 : program.category === 'A' ? 16 : 18,
      documents: [
        `Учебный план категории ${program.category}`,
        `Календарный учебный график категории ${program.category}`,
        `Рабочая программа категории ${program.category}`
      ],
      schedule: program.category === 'B'
        ? 'Группы: утренние, вечерние, выходного дня'
        : program.category === 'A'
        ? 'Группы: сезонные (март-октябрь)'
        : 'Группы: утренние, вечерние',
      vehicleTypes: program.category === 'B'
        ? 'Легковые автомобили, разрешенная максимальная масса не более 3,5 т'
        : program.category === 'A'
        ? 'Мотоциклы'
        : 'Автомобили, разрешенная максимальная масса свыше 3,5 т'
    })),
    standards: [
      {
        category: 'A, B, C',
        standard: 'Примерные программы профессиональной подготовки водителей транспортных средств соответствующих категорий',
        document: 'Приказ Минобрнауки России от 26.12.2013 № 1408',
        link: 'https://base.garant.ru/70597582/'
      }
    ]
  };

  const handleDownloadDocument = (category: string, docName: string) => {
    console.log(`Downloading ${docName} for category ${category}`);
    // Здесь будет логика скачивания документа
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Загрузка образовательных программ...</Typography>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Образовательные программы - Автошкола Драйв</title>
        <meta 
          name="description" 
          content="Образовательные программы автошколы: подготовка водителей категорий A, B, C. Учебные планы, стоимость, продолжительность обучения." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Образование
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Информация о реализуемых уровнях образования, формах обучения, нормативных сроках обучения, 
            языках обучения, учебных предметах, курсах, дисциплинах (модулях), практике
          </Typography>
        </Box>

        {/* Общая информация */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Общая информация об образовании
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Уровень образования:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {educationPrograms.general.level}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Форма обучения:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {educationPrograms.general.form}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Язык обучения:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {educationPrograms.general.language}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Государственная аккредитация:
                  </Typography>
                  <Alert severity="info">
                    {educationPrograms.general.accreditation}
                  </Alert>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Адаптированные образовательные программы:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {educationPrograms.general.adaptedPrograms}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Образовательные программы */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Реализуемые образовательные программы
        </Typography>

        <Grid container spacing={3}>
          {educationPrograms.programs.map((program) => (
            <Grid item xs={12} key={program.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    {program.category === 'A' && <DirectionsCar sx={{ mr: 2, color: 'primary.main' }} />}
                    {program.category === 'B' && <DirectionsCar sx={{ mr: 2, color: 'primary.main' }} />}
                    {program.category === 'C' && <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" component="h3">
                        Категория {program.category}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {program.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`От ${program.cost.toLocaleString('ru-RU')} ₽`} 
                      color="secondary" 
                      size="medium"
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {program.description}
                  </Typography>

                  <Grid container spacing={3}>
                    {/* Продолжительность и структура */}
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6">
                            Продолжительность
                          </Typography>
                        </Box>
                        <Typography variant="body2" gutterBottom>
                          <strong>Общее количество часов:</strong> {program.duration.total}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Теоретические занятия:</strong> {program.duration.theory} ч
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Практические занятия:</strong> {program.duration.practice} ч
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Экзамены:</strong> {program.duration.exam} ч
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          <strong>Минимальный возраст:</strong> {program.minAge} лет
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Численность обучающихся */}
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <People sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6">
                            Численность обучающихся
                          </Typography>
                        </Box>
                        <Typography variant="body2" gutterBottom>
                          <strong>Обучается в настоящее время:</strong> {program.students.current} чел.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Выпуск 2023 года:</strong> {program.students.graduated2023} чел.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Выпуск 2022 года:</strong> {program.students.graduated2022} чел.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {program.schedule}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Документы */}
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Description sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6">
                            Учебные документы
                          </Typography>
                        </Box>
                        {program.documents.map((doc, index) => (
                          <Box key={index} sx={{ mb: 1 }}>
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<GetApp />}
                              onClick={() => handleDownloadDocument(program.category, doc)}
                              sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
                            >
                              {doc}
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                    <Typography variant="body2" color="info.contrastText">
                      <strong>Типы транспортных средств:</strong> {program.vehicleTypes}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Сводная таблица */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Сводная информация о реализуемых программах
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Категория</strong></TableCell>
                    <TableCell><strong>Наименование программы</strong></TableCell>
                    <TableCell><strong>Продолжительность (часы)</strong></TableCell>
                    <TableCell><strong>Численность обучающихся</strong></TableCell>
                    <TableCell><strong>Стоимость (руб.)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {educationPrograms.programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell>
                        <Chip label={program.category} color="primary" />
                      </TableCell>
                      <TableCell>{program.name}</TableCell>
                      <TableCell>{program.duration.total}</TableCell>
                      <TableCell>{program.students.current}</TableCell>
                      <TableCell>{program.cost.toLocaleString('ru-RU')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Образовательные стандарты */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Федеральные государственные образовательные стандарты и образовательные стандарты
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Профессиональная подготовка водителей транспортных средств осуществляется 
              в соответствии с примерными программами, утвержденными Министерством образования и науки РФ
            </Alert>

            {educationPrograms.standards.map((standard, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Категории: {standard.category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Стандарт:</strong> {standard.standard}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Документ:</strong> {standard.document}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  href={standard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Перейти к документу
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Дата обновления */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Дата последнего обновления информации: {new Date().toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ProgramsPage; 