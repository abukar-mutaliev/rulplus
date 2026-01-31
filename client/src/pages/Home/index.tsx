import { Container, Typography, Box, Card, CardContent, Grid, Button, Avatar, Paper, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  DirectionsCar,
  Star,
  People,
  Phone,
  LocationOn,
  Schedule,
  LocalOffer,
  Security,
  EmojiEvents
} from '@mui/icons-material';

// Импорт API и типов
import { servicesApi, IMainService } from '../../shared/api/servicesApi';
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_TELEGRAM_URL,
  CONTACT_WHATSAPP_URL,
} from '../../shared/constants/contact';

// Импорт изображения офиса
import homePageImage from '../../assets/homePage.jpeg';

const HomePage = () => {
  const [programs, setPrograms] = useState<IMainService[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);

  // Функция для правильного склонения слов
  const getDeclension = (number: number, one: string, few: string, many: string): string => {
    const absNumber = Math.abs(number);
    if (absNumber % 10 === 1 && absNumber % 100 !== 11) {
      return one;
    }
    if (absNumber % 10 >= 2 && absNumber % 10 <= 4 && (absNumber % 100 < 10 || absNumber % 100 >= 20)) {
      return few;
    }
    return many;
  };

  const advantages = [
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Высокое качество обучения',
      description: 'Современные методики, опытные инструкторы, высокий процент сдачи экзаменов'
    },
    {
      icon: <DirectionsCar sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Современный автопарк',
      description: 'Новые автомобили с дублирующими педалями и системами безопасности'
    },
    {
      icon: <Schedule sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Гибкое расписание',
      description: 'Утренние, дневные и вечерние группы. Обучение в выходные дни'
    },
    {
      icon: <LocalOffer sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Доступные цены',
      description: 'Конкурентные цены, возможность рассрочки платежа, скидки для студентов'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Безопасность',
      description: 'Все автомобили застрахованы, инструкторы имеют большой стаж вождения'
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Индивидуальный подход',
      description: 'Персональный график обучения, внимание к каждому ученику'
    }
  ];

  // Загрузка программ обучения из API
  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setProgramsLoading(true);
      const response = await servicesApi.getServices();
      if (response.mainServices && response.mainServices.length > 0) {
        setPrograms(response.mainServices);
      } else {
        // Fallback данные, если API недоступен
        setPrograms([
          {
            id: 1,
            category: 'B',
            name: 'Легковые автомобили',
            description: 'Базовый курс для получения водительских прав категории B',
            duration: '2.5 месяца',
            cost: 35000,
            includes: ['Теоретическое обучение', 'Практические занятия', 'Внутренний экзамен'],
            additionalCosts: []
          },
          {
            id: 2,
            category: 'A',
            name: 'Мотоциклы',
            description: 'Обучение вождению мотоциклов и мотороллеров',
            duration: '2 месяца',
            cost: 25000,
            includes: ['Теоретическое обучение', 'Практические занятия'],
            additionalCosts: []
          },
          {
            id: 3,
            category: 'C',
            name: 'Грузовые автомобили',
            description: 'Профессиональная подготовка водителей грузовиков',
            duration: '3 месяца',
            cost: 45000,
            includes: ['Теоретическое обучение', 'Практические занятия', 'Специализированные навыки'],
            additionalCosts: []
          }
        ]);
      }
    } catch (error) {
      console.error('Ошибка при загрузке программ обучения:', error);
      // Fallback данные при ошибке
      setPrograms([
        {
          id: 1,
          category: 'B',
          name: 'Легковые автомобили',
          description: 'Базовый курс для получения водительских прав категории B',
          duration: '2.5 месяца',
          cost: 35000,
          includes: ['Теоретическое обучение', 'Практические занятия', 'Внутренний экзамен'],
          additionalCosts: []
        }
      ]);
    } finally {
      setProgramsLoading(false);
    }
  };

  const stats = [
    { number: '3', label: 'Категории обучения' },
    { number: '5', label: 'Опытных инструкторов' },
    { number: '100%', label: 'Гарантия качества' },
    { number: '8', label: 'Учебных автомобилей' }
  ];

  const testimonials = [
    {
      name: 'Мадина Магомедовна А.',
      text: 'Отличная автошкола! Сдала экзамен с первого раза благодаря качественному обучению.',
      rating: 5
    },
    {
      name: 'Адам Асхабович Ч.',
      text: 'Инструкторы профессиональные, терпеливые. Очень доволен выбором автошколы.',
      rating: 5
    },
    {
      name: 'Алия Джабраиловна М',
      text: 'Удобное расписание, современные автомобили. Рекомендую всем знакомым!',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>РУЛЬ+ - Автошкола нового поколения | СЕЛ - ПОЕХАЛ</title>
        <meta 
          name="description" 
          content="РУЛЬ+ - современная автошкола в Назрани. СЕЛ - ПОЕХАЛ! Качественное обучение вождению категорий A, B, C. Опытные инструкторы, современный автопарк, высокий процент сдачи экзаменов."
        />
        <meta name="keywords" content="РУЛЬ+, автошкола, обучение вождению, водительские права, категория B, Назрань, сел поехал" />
      </Helmet>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 900, 
                    fontSize: { xs: '3rem', md: '4rem' },
                    letterSpacing: '2px',
                    mr: 1 
                  }}
                >
                  РУЛЬ
                </Typography>
                <Typography 
                  variant="h1" 
                  component="span" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 900,
                    fontSize: { xs: '3rem', md: '4rem' },
                    letterSpacing: '2px',
                  }}
                >
                  +
                </Typography>
              </Box>
              
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  color: 'primary.main', 
                  fontWeight: 700,
                  letterSpacing: '4px',
                  textTransform: 'uppercase'
                }}
              >
                СЕЛ — ПОЕХАЛ
              </Typography>
              
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.4 }}>
                Автошкола нового поколения! 
                Современные методики обучения, профессиональные инструкторы 
                и 95% наших учеников сдают экзамен с первого раза.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  color="primary"
                  component={Link}
                  to="/education/programs"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700
                  }}
                >
                  Выбрать программу
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      bgcolor: 'rgba(220, 53, 69, 0.1)',
                    },
                  }}
                  href={`tel:${CONTACT_PHONE_TEL}`}
                >
                  <Phone sx={{ mr: 1 }} />
                  Позвонить
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Box
                  component="img"
                  src={homePageImage}
                  alt="Современный офис автошколы РУЛЬ+ с красивым дизайном"
                  sx={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(220, 53, 69, 0.3)',
                    filter: 'brightness(1.1) contrast(1.05)',
                    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 25px 50px rgba(220, 53, 69, 0.4)',
                    }
                  }}
                />
                {/* Декоративные элементы */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(45deg, #dc3545, #ff6b7a)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(220, 53, 69, 0.4)',
                    zIndex: 2
                  }}
                >
                  <DirectionsCar sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary.main" fontWeight="bold">
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Programs */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Программы обучения
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Выберите подходящую категорию и начните обучение уже сегодня
          </Typography>
        </Box>

        {programsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Загрузка программ обучения...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={4} key={program.id || index}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(220, 53, 69, 0.2)',
                      transform: 'translateY(-4px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>
                        <Typography variant="h4" color="white" fontWeight="bold">
                          {program.category}
                        </Typography>
                      </Avatar>
                      <Box>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                          Категория {program.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {program.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {program.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Длительность:
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {program.duration}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            В стоимость входит:
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {program.includes.length} {getDeclension(program.includes.length, 'пункт', 'пункта', 'пунктов')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography variant="h5" color="primary.main" fontWeight="bold">
                        {program.cost.toLocaleString('ru-RU')} ₽
                      </Typography>
                      <Button variant="outlined" href={`tel:${CONTACT_PHONE_TEL}`}>
                        Позвонить
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Advantages */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Почему выбирают РУЛЬ<span style={{ color: '#dc3545' }}>+</span>
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Преимущества обучения в автошколе нового поколения
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {advantages.map((advantage, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {advantage.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {advantage.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {advantage.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Отзывы наших учеников
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Что говорят о нас выпускники РУЛЬ<span style={{ color: '#dc3545' }}>+</span>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: 'warning.main' }} />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                  — {testimonial.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Готовы начать обучение?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            СЕЛ — ПОЕХАЛ! Свяжитесь с нами сегодня и сделайте первый шаг к получению водительских прав
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'grey.100',
                  boxShadow: '0 6px 20px rgba(255,255,255,0.3)',
                },
              }}
              href={`tel:${CONTACT_PHONE_TEL}`}
            >
              <Phone sx={{ mr: 1 }} />
              Позвонить
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
              href={CONTACT_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Quick Info */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Наш адрес
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  г. Назрань, пр-т И. Базоркина, 28 В
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Телефон
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {CONTACT_PHONE_DISPLAY}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Schedule sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Режим работы
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage; 