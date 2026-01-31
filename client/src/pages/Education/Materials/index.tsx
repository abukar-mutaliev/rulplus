import { Container, Typography, Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Build, DirectionsCar, School, LocalShipping, Computer, MenuBook, Security } from '@mui/icons-material';

const MaterialsPage = () => {
  // В будущем эти данные будут загружаться из API
  const materialsData = {
    facilities: [
      {
        id: 1,
        name: 'Учебные классы',
        count: 4,
        totalArea: 240,
        capacity: 80,
        equipment: ['Мультимедийные проекторы', 'Интерактивные доски', 'Компьютеры', 'Макеты автомобилей'],
        description: 'Просторные светлые классы с современным оборудованием для теоретических занятий'
      },
      {
        id: 2,
        name: 'Компьютерный класс',
        count: 1,
        totalArea: 60,
        capacity: 20,
        equipment: ['20 компьютеров', 'Программы для изучения ПДД', 'Экзаменационные программы'],
        description: 'Специализированный класс для компьютерного тестирования и изучения ПДД'
      },
      {
        id: 3,
        name: 'Автодром',
        count: 1,
        totalArea: 5000,
        capacity: 10,
        equipment: ['Разметка для всех упражнений', 'Конусы и ограждения', 'Освещение'],
        description: 'Закрытая площадка для первоначального обучения практическому вождению'
      }
    ],
    vehicles: [
      {
        id: 1,
        category: 'B',
        model: 'Lada Granta',
        year: 2024,
        count: 8,
        fuelType: 'Бензин',
        transmission: 'Механическая',
        status: 'Исправен',
        equipment: ['Дублирующие педали', 'Зеркала для инструктора', 'Знак "Учебное ТС"']
      },
      {
        id: 2,
        category: 'B',
        model: 'Lada Granta',
        year: 2025,
        count: 5,
        fuelType: 'Бензин',
        transmission: 'Автоматическая',
        status: 'Исправен',
        equipment: ['Дублирующие педали', 'Зеркала для инструктора', 'Знак "Учебное ТС"']
      },
      {
        id: 3,
        category: 'C',
        model: 'ГАЗ-3307',
        year: 2020,
        count: 3,
        fuelType: 'Дизель',
        transmission: 'Механическая',
        status: 'Исправен',
        equipment: ['Дублирующие педали', 'Зеркала для инструктора', 'Знак "Учебное ТС"']
      }
    ],
    technicalEquipment: [
      {
        category: 'Обучающие материалы',
        items: [
          'Плакаты по ПДД (45 шт.)',
          'Макеты дорожных знаков (120 шт.)',
          'Схемы устройства автомобиля',
          'Видеофильмы по безопасности движения'
        ]
      },
      {
        category: 'Техническое оборудование',
        items: [
          'Тренажер для отработки навыков вождения',
          'Макет двигателя автомобиля',
          'Макет системы торможения',
          'Набор инструментов для ТО'
        ]
      },
      {
        category: 'Компьютерное оборудование',
        items: [
          'Компьютеры для изучения ПДД (20 шт.)',
          'Программа "Автошкола МААШ"',
          'Экзаменационные билеты (электронные)',
          'Мультимедийные курсы по вождению'
        ]
      }
    ],
    safety: [
      'Система пожарной сигнализации',
      'Огнетушители в каждом помещении',
      'Аптечки первой помощи',
      'Планы эвакуации',
      'Охранная сигнализация',
      'Видеонаблюдение'
    ],
    accessibility: {
      available: false,
      reason: 'Программы для обучения лиц с ограниченными возможностями здоровья в настоящее время не реализуются',
      adaptations: []
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Исправен': return 'success';
      case 'Требует ремонта': return 'warning';
      case 'Неисправен': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <Helmet>
        <title>Материально-техническое обеспечение - Автошкола Драйв</title>
        <meta 
          name="description" 
          content="Материально-техническое обеспечение автошколы: учебные помещения, транспортные средства, оборудование для обучения вождению." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Материально-техническое обеспечение образовательной деятельности
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Информация об условиях обучения, включая сведения о наличии оборудованных учебных кабинетов, 
            объектов для проведения практических занятий, транспортных средств
          </Typography>
        </Box>

        {/* Учебные помещения */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Учебные помещения и объекты
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {materialsData.facilities.map((facility) => (
                <Grid item xs={12} md={6} key={facility.id}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        {facility.name}
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          <strong>Количество:</strong> {facility.count} шт.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Общая площадь:</strong> {facility.totalArea} м²
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Вместимость:</strong> {facility.capacity} человек
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {facility.description}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        <strong>Оборудование:</strong>
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        {facility.equipment.map((item, index) => (
                          <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
                            • {item}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Транспортные средства */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <DirectionsCar sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Транспортные средства для обучения
              </Typography>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Категория</strong></TableCell>
                    <TableCell><strong>Марка, модель</strong></TableCell>
                    <TableCell><strong>Год выпуска</strong></TableCell>
                    <TableCell><strong>Количество</strong></TableCell>
                    <TableCell><strong>Тип КПП</strong></TableCell>
                    <TableCell><strong>Состояние</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materialsData.vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <Chip label={vehicle.category} color="primary" size="small" />
                      </TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.count}</TableCell>
                      <TableCell>{vehicle.transmission}</TableCell>
                      <TableCell>
                        <Chip 
                          label={vehicle.status} 
                          color={getStatusColor(vehicle.status)} 
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Специальное оборудование учебных транспортных средств:
              </Typography>
              <Grid container spacing={2}>
                {materialsData.vehicles[0].equipment.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Typography variant="body2">
                      • {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Техническое оборудование */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Build sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Учебно-материальная база
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {materialsData.technicalEquipment.map((category, categoryIndex) => (
                <Grid item xs={12} md={4} key={categoryIndex}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="secondary">
                        {category.category}
                      </Typography>
                      
                      {category.items.map((item, index) => (
                        <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                          • {item}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Безопасность */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Security sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Обеспечение безопасности
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {materialsData.safety.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="body2">
                      ✓ {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Доступность для лиц с ОВЗ */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Доступность образовательных услуг для лиц с ограниченными возможностями здоровья
            </Typography>

            {materialsData.accessibility.available ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Образовательная организация обеспечивает доступность для лиц с ОВЗ
              </Alert>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                {materialsData.accessibility.reason}
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary">
              При необходимости организация готова рассмотреть возможности адаптации 
              образовательных программ и материально-технической базы для обучения лиц с ОВЗ.
            </Typography>
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

export default MaterialsPage; 