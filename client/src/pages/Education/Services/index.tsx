import { Container, Typography, Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert, Chip, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AttachMoney, Description, GetApp, Schedule, Info, Payment } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { servicesApi, IServicesData } from '../../../shared/api/servicesApi';

const ServicesPage = () => {
  const [servicesData, setServicesData] = useState<IServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await servicesApi.getServices();
        setServicesData(data);
      } catch (error) {
        console.error('Ошибка при загрузке услуг:', error);
        setError('Ошибка при загрузке данных об услугах');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleDownloadContract = () => {
    console.log('Downloading contract template');
    // Здесь будет логика скачивания образца договора
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Загрузка информации об услугах...</Typography>
      </Container>
    );
  }

  if (error || !servicesData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {error || 'Не удалось загрузить информацию об услугах'}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Платные образовательные услуги - Автошкола РУЛЬ+</title>
        <meta 
          name="description" 
          content="Стоимость обучения в автошколе РУЛЬ+: цены на курсы подготовки водителей категорий A, B, C, условия оплаты, скидки." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Платные образовательные услуги
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Информация о стоимости обучения, условиях оплаты и дополнительных услугах
          </Typography>
        </Box>

        {/* Информационное сообщение */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
            Все цены указаны в рублях и действительны на {new Date().toLocaleDateString('ru-RU')}. 
            Стоимость услуг может изменяться. Актуальную информацию уточняйте по телефону +7 (495) 123-45-67.
          </Typography>
        </Alert>

        {/* Основные программы обучения */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Программы профессиональной подготовки водителей
        </Typography>

        <Grid container spacing={3}>
          {servicesData.mainServices.map((service) => (
            <Grid item xs={12} key={service.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip 
                          label={`Категория ${service.category}`} 
                          color="primary" 
                          sx={{ mr: 2 }}
                        />
                        <Typography variant="h5" component="h3">
                          {service.name}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Schedule sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Продолжительность: {service.duration}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {service.cost.toLocaleString('ru-RU')} ₽
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        полная стоимость
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" gutterBottom>
                        В стоимость входит:
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        {service.includes.map((item, index) => (
                          <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                            ✓ {item}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" gutterBottom>
                        Дополнительные расходы:
                      </Typography>
                      {service.additionalCosts.map((cost, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {cost.service}: <strong>{cost.cost} ₽</strong>
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({cost.note})
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Дополнительные услуги */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Дополнительные услуги
          </Typography>

          <Grid container spacing={3}>
            {servicesData.additionalServices.map((service) => (
              <Grid item xs={12} sm={6} key={service.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary">
                        {service.cost.toLocaleString('ru-RU')} ₽
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.unit}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {service.note}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Условия оплаты */}
        <Card sx={{ mt: 6 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Payment sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Условия оплаты
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Способы оплаты:
                </Typography>
                {servicesData.paymentTerms.methods.map((method, index) => (
                  <Typography key={method.id || index} variant="body2" sx={{ mb: 0.5 }}>
                    • {method.method}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  График оплаты:
                </Typography>
                {servicesData.paymentTerms.schedule.map((payment, index) => (
                  <Box key={payment.id || index} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>{payment.amount}</strong> — {payment.stage}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {payment.note}
                    </Typography>
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Скидки:
                </Typography>
                {servicesData.paymentTerms.discounts.map((discount, index) => (
                  <Box key={discount.id || index} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>{discount.discount}</strong> — {discount.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {discount.note}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Сводная таблица цен */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Сводная таблица стоимости услуг
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Наименование услуги</strong></TableCell>
                    <TableCell><strong>Продолжительность</strong></TableCell>
                    <TableCell><strong>Стоимость (руб.)</strong></TableCell>
                    <TableCell><strong>Примечание</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {servicesData.mainServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        <Typography variant="h6" color="primary">
                          {service.cost.toLocaleString('ru-RU')}
                        </Typography>
                      </TableCell>
                      <TableCell>Полный курс обучения</TableCell>
                    </TableRow>
                  ))}
                  {servicesData.additionalServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {service.cost.toLocaleString('ru-RU')}
                        </Typography>
                      </TableCell>
                      <TableCell>{service.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Договор и документы */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Description sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Договор об оказании платных образовательных услуг
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Необходимые документы для заключения договора:
                </Typography>
                {servicesData.contractInfo.requiredDocuments.map((doc, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {doc}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Образец договора:
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Для ознакомления с условиями обучения вы можете скачать образец договора 
                  об оказании платных образовательных услуг.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<GetApp />}
                  onClick={handleDownloadContract}
                >
                  Скачать образец договора
                </Button>
              </Grid>
            </Grid>

            <Alert severity="warning" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>Обратите внимание:</strong> Заключение договора и начало обучения возможно только 
                при наличии действующей медицинской справки установленного образца. Стоимость медицинской 
                справки в договор не включается и оплачивается отдельно.
              </Typography>
            </Alert>
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

export default ServicesPage; 