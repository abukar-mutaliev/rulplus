import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Divider, CircularProgress, Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Business, Phone, Email, LocationOn, Schedule } from '@mui/icons-material';
import { basicInfoApi, IBasicInfo } from '../../../shared/api/basicInfo';

const BasicInfoPage = () => {
  const [basicInfo, setBasicInfo] = useState<IBasicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBasicInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await basicInfoApi.getBasicInfo();
        setBasicInfo(data);
      } catch (err) {
        console.error('Ошибка загрузки основных сведений:', err);
        setError('Не удалось загрузить информацию. Попробуйте обновить страницу.');
      } finally {
        setLoading(false);
      }
    };

    loadBasicInfo();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !basicInfo) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Данные не найдены'}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Основные сведения - Автошкола Драйв</title>
        <meta 
          name="description" 
          content="Основные сведения об автошколе: полное наименование, адрес, контакты, учредитель, режим работы согласно требованиям Рособрнадзора." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Основные сведения об образовательной организации
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Информация размещена в соответствии с требованиями федерального законодательства
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Основная информация */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Business sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Наименование организации
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Полное наименование:
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                  Общество с ограниченной ответственностью "Джабраил"
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>
                    Сокращенное наименование:
                  </Typography>
                  <Typography variant="body1">
                  Сокращенное наименование: ООО "Джабраил"
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Дата создания образовательной организации:
                  </Typography>
                  <Typography variant="body1">
                    01.01.2025
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Адреса */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Адреса
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Юридический адрес:
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                  386151, РЕСПУБЛИКА ИНГУШЕТИЯ, М.Р-Н НАЗРАНОВСКИЙ, С.П. ЭКАЖЕВО, С ЭКАЖЕВО, УЛ ОСКАНОВА, Д. 38
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Фактический адрес:
                  </Typography>
                  <Typography variant="body1">
                  386151, РЕСПУБЛИКА ИНГУШЕТИЯ, М.Р-Н НАЗРАНОВСКИЙ, С.П. ЭКАЖЕВО, С ЭКАЖЕВО, УЛ ОСКАНОВА, Д. 38
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Контактная информация */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Phone sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Контактная информация
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Телефон:
                        </Typography>
                        <Typography variant="body1">
                        +7 (988) 822-28-88
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Электронная почта:
                        </Typography>
                        <Typography variant="body1">
                        rulplus@mail.ru
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Business sx={{ mr: 1, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Официальный сайт:
                        </Typography>
                        <Typography variant="body1">
                          {basicInfo.website}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Боковая панель */}
          <Grid item xs={12} md={4}>
            {/* Режим работы */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" component="h3">
                    Режим работы
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    {basicInfo.workSchedule.weekdays}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {basicInfo.workSchedule.saturday}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {basicInfo.workSchedule.sunday}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {basicInfo.workSchedule.holidays}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

          </Grid>
        </Grid>
        {/* Дата обновления */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Дата последнего обновления информации: {new Date(basicInfo.lastUpdated).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default BasicInfoPage; 