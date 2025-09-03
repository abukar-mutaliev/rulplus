import { Container, Typography, Box, Card, CardContent, Grid, Avatar, Chip } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { 
  Person, 
  Phone, 
  Email, 
  Schedule,
  Business,
  AccountCircle 
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { basicInfoApi } from '../../../shared/api/basicInfo';

const StructurePage = () => {
  const { data: basicInfo, isLoading, error } = useQuery({
    queryKey: ['basicInfo'],
    queryFn: basicInfoApi.getBasicInfo,
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Загрузка данных о структуре...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Ошибка загрузки данных о структуре
        </Typography>
      </Container>
    );
  }

  const director = basicInfo?.management?.director;

  return (
    <>
      <Helmet>
        <title>Структура и органы управления - РУЛЬ+ | СЕЛ - ПОЕХАЛ</title>
        <meta 
          name="description" 
          content="Структура и органы управления автошколы РУЛЬ+. Информация о директоре и руководящем составе образовательной организации." 
        />
        <meta name="keywords" content="РУЛЬ+, структура управления, директор, органы управления, автошкола" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Заголовок страницы */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #212529, #dc3545)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Структура и органы управления
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Информация о структуре и органах управления автошколы РУЛЬ+ "СЕЛ — ПОЕХАЛ"
          </Typography>
        </Box>

        {/* Общая информация об управлении */}
        <Card sx={{ mb: 6, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Business sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4" fontWeight="bold">
                Система управления
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Управление автошколой РУЛЬ+ осуществляется в соответствии с законодательством 
              Российской Федерации и Уставом организации. Органы управления обеспечивают 
              эффективную деятельность образовательной организации и качественное предоставление 
              образовательных услуг в сфере подготовки водителей транспортных средств.
            </Typography>
            <Typography variant="body1">
              Единоличным исполнительным органом автошколы является директор, который осуществляет 
              текущее руководство деятельностью организации и подотчетен учредителю.
            </Typography>
          </CardContent>
        </Card>

        {/* Руководящий состав */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Руководящий состав
        </Typography>

        {director && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card 
                sx={{ 
                  borderRadius: 3,
                  boxShadow: 4,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        bgcolor: 'primary.main',
                        mr: 3,
                        fontSize: '2rem'
                      }}
                    >
                      <AccountCircle sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Box>
                      <Chip 
                        label={director.position} 
                        color="primary" 
                        sx={{ 
                          mb: 1, 
                          fontWeight: 'bold',
                          letterSpacing: '1px',
                          px: 2
                        }} 
                      />
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {director.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Phone sx={{ color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Телефон
                          </Typography>
                          <Typography variant="body1" fontWeight="600">
                            {director.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Email sx={{ color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1" fontWeight="600">
                            {director.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Schedule sx={{ color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Режим работы
                          </Typography>
                          <Typography variant="body1" fontWeight="600">
                            {director.workSchedule}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Person sx={{ color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Часы приема
                          </Typography>
                          <Typography variant="body1" fontWeight="600">
                            {director.receptionHours}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Полномочия директора:
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Общее руководство деятельностью автошколы
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Организация образовательного процесса
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Управление персоналом
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Контроль качества обучения
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Взаимодействие с государственными органами
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Финансовое планирование и контроль
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Дополнительная информация */}
        <Card sx={{ mt: 6, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Принципы управления РУЛЬ+
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                    Прозрачность
                  </Typography>
                  <Typography variant="body2">
                    Открытая отчетность и доступность информации о деятельности автошколы
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                    Качество
                  </Typography>
                  <Typography variant="body2">
                    Постоянное совершенствование образовательного процесса и услуг
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                    Ответственность
                  </Typography>
                  <Typography variant="body2">
                    Персональная ответственность за результаты и качество обучения
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Контактная информация для обращений */}
        <Card sx={{ mt: 6, borderRadius: 3, boxShadow: 3, bgcolor: 'secondary.main', color: 'white' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Обращения к руководству
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              По вопросам деятельности автошколы и качества образовательных услуг 
              вы можете обратиться к директору в часы приема или направить письменное обращение
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4, 
              flexWrap: 'wrap',
              '& > div': {
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}>
              <Box>
                <Phone />
                <Typography variant="body1" fontWeight="600">
                  {director?.phone}
                </Typography>
              </Box>
              <Box>
                <Email />
                <Typography variant="body1" fontWeight="600">
                  {director?.email}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default StructurePage; 