import { Container, Typography, Box, Card, CardContent, Grid, Avatar, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { School, Person, Star, WorkOutline, Email, Phone } from '@mui/icons-material';

const StaffPage = () => {
  // В будущем эти данные будут загружаться из API
  const staffData = {
    totalCount: 12,
    categories: [
      {
        name: 'Преподаватели теоретических дисциплин',
        count: 5,
        staff: [
          {
            id: 1,
            name: 'Иванов Петр Сергеевич',
            position: 'Преподаватель теории',
            education: 'Высшее педагогическое',
            experience: 15,
            qualificationCategory: 'Высшая',
            subjects: ['Правила дорожного движения', 'Основы законодательства', 'Психология вождения'],
            vehicleTypes: [],
            photo: null,
            email: 'ivanov@driving-school.ru',
            phone: '+7 (495) 123-45-70'
          },
          {
            id: 2,
            name: 'Петрова Анна Михайловна',
            position: 'Преподаватель теории',
            education: 'Высшее техническое',
            experience: 12,
            qualificationCategory: 'Первая',
            subjects: ['Устройство автомобиля', 'Техническое обслуживание'],
            vehicleTypes: [],
            photo: null,
            email: 'petrova@driving-school.ru',
            phone: '+7 (495) 123-45-71'
          }
        ]
      },
      {
        name: 'Мастера производственного обучения',
        count: 7,
        staff: [
          {
            id: 3,
            name: 'Сидоров Алексей Владимирович',
            position: 'Мастер производственного обучения (категория B)',
            education: 'Среднее специальное',
            experience: 20,
            qualificationCategory: 'Высшая',
            subjects: ['Практическое вождение категории B'],
            vehicleTypes: ['Легковые автомобили'],
            photo: null,
            email: 'sidorov@driving-school.ru',
            phone: '+7 (495) 123-45-72'
          },
          {
            id: 4,
            name: 'Козлов Дмитрий Александрович',
            position: 'Мастер производственного обучения (категория C)',
            education: 'Среднее специальное',
            experience: 18,
            qualificationCategory: 'Первая',
            subjects: ['Практическое вождение категории C'],
            vehicleTypes: ['Грузовые автомобили'],
            photo: null,
            email: 'kozlov@driving-school.ru',
            phone: '+7 (495) 123-45-73'
          }
        ]
      }
    ],
    qualificationRequirements: [
      'Высшее или среднее профессиональное образование',
      'Стаж работы в сфере автомобильного транспорта не менее 3 лет',
      'Действующее водительское удостоверение соответствующей категории',
      'Прохождение курсов повышения квалификации каждые 5 лет',
      'Медицинская справка о пригодности к управлению ТС'
    ]
  };

  const getQualificationColor = (category: string) => {
    switch (category) {
      case 'Высшая': return 'success';
      case 'Первая': return 'primary';
      case 'Вторая': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>Педагогический состав - Автошкола Драйв</title>
        <meta 
          name="description" 
          content="Педагогический состав автошколы: информация о преподавателях теории и мастерах практического обучения вождению." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Руководство. Педагогический (научно-педагогический) состав
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Информация о педагогических работниках организации
          </Typography>
        </Box>

        {/* Общая статистика */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Общие сведения о педагогическом составе
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
                  <Typography variant="h3" color="primary.contrastText" gutterBottom>
                    {staffData.totalCount}
                  </Typography>
                  <Typography variant="h6" color="primary.contrastText">
                    Общее количество педагогических работников
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'secondary.light', borderRadius: 2 }}>
                  <Typography variant="h3" color="secondary.contrastText" gutterBottom>
                    {staffData.categories[0].count}
                  </Typography>
                  <Typography variant="h6" color="secondary.contrastText">
                    Преподаватели теоретических дисциплин
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="h3" color="success.contrastText" gutterBottom>
                    {staffData.categories[1].count}
                  </Typography>
                  <Typography variant="h6" color="success.contrastText">
                    Мастера производственного обучения
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Педагогический состав по категориям */}
        {staffData.categories.map((category, categoryIndex) => (
          <Card key={categoryIndex} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {category.name}
              </Typography>
              
              <Grid container spacing={3}>
                {category.staff.map((person) => (
                  <Grid item xs={12} md={6} key={person.id}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 60, height: 60 }}>
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                              {person.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {person.position}
                            </Typography>
                            <Chip 
                              label={`${person.qualificationCategory} категория`}
                              color={getQualificationColor(person.qualificationCategory) as any}
                              size="small"
                            />
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>
                            <strong>Образование:</strong> {person.education}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            <strong>Стаж работы:</strong> {person.experience} лет
                          </Typography>
                          
                          <Typography variant="body2" gutterBottom>
                            <strong>Преподаваемые дисциплины:</strong>
                          </Typography>
                          <Box sx={{ pl: 2 }}>
                            {person.subjects.map((subject, index) => (
                              <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem' }}>
                                • {subject}
                              </Typography>
                            ))}
                          </Box>
                          
                          {person.vehicleTypes && person.vehicleTypes.length > 0 && (
                            <>
                              <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
                                <strong>Типы ТС:</strong> {person.vehicleTypes.join(', ')}
                              </Typography>
                            </>
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
                            <Email sx={{ mr: 0.5, fontSize: 16 }} />
                            <Typography variant="caption">{person.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
                            <Phone sx={{ mr: 0.5, fontSize: 16 }} />
                            <Typography variant="caption">{person.phone}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}

        {/* Сводная таблица */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Сводная информация о педагогических работниках
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>ФИО</strong></TableCell>
                    <TableCell><strong>Должность</strong></TableCell>
                    <TableCell><strong>Образование</strong></TableCell>
                    <TableCell><strong>Стаж</strong></TableCell>
                    <TableCell><strong>Категория</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffData.categories.flatMap(category => 
                    category.staff.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>{person.position}</TableCell>
                        <TableCell>{person.education}</TableCell>
                        <TableCell>{person.experience} лет</TableCell>
                        <TableCell>
                          <Chip 
                            label={person.qualificationCategory}
                            color={getQualificationColor(person.qualificationCategory) as any}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Требования к квалификации */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Star sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Требования к квалификации педагогических работников
              </Typography>
            </Box>

            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
              Все педагогические работники соответствуют установленным квалификационным требованиям:
            </Typography>

            {staffData.qualificationRequirements.map((requirement, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                • {requirement}
              </Typography>
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

export default StaffPage; 