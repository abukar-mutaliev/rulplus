import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Divider,
  Button,
  Link as MuiLink
} from '@mui/material';
import {
  Phone,
  LocationOn,
  Business,
  AccountBalance,
  Person,
  Info
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_TELEGRAM_URL,
  CONTACT_WHATSAPP_URL,
} from '../../shared/constants/contact';

const ContactsPage = () => {
  const companyInfo = {
    fullName: 'Общество с ограниченной ответственностью "Джабраил"',
    shortName: 'ООО "Джабраил"',
    brandName: 'РУЛЬ+',
    slogan: 'СЕЛ — ПОЕХАЛ',
    legalAddress: '386151, РЕСПУБЛИКА ИНГУШЕТИЯ, М.Р-Н НАЗРАНОВСКИЙ, С.П. ЭКАЖЕВО, С ЭКАЖЕВО, УЛ ОСКАНОВА, Д. 38',
    postalAddress: '386151, РЕСПУБЛИКА ИНГУШЕТИЯ, М.Р-Н НАЗРАНОВСКИЙ, С.П. ЭКАЖЕВО, С ЭКАЖЕВО, УЛ ОСКАНОВА, Д. 38',
    phone: CONTACT_PHONE_DISPLAY,
    inn: '0600020231',
    kpp: '060001001',
    ogrn: '1250600001794 от 23.05.2025',
    director: 'Муталиев Амурклан Ибрагимович',
    directorBasis: 'действует на основании Устава',
    bankInfo: {
      account: '40702810460510000279',
      correspondentAccount: '30101810907020000615',
      bik: '040702615',
      bank: 'ПАО Сбербанк'
    },
    okved: '85.42.1'
  };

  return (
    <>
      <Helmet>
        <title>Контакты - РУЛЬ+ | Автошкола</title>
        <meta name="description" content="Контактная информация автошколы РУЛЬ+. Адрес, телефон, реквизиты компании ООО 'Джабраил'." />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 6 }}>

        <Grid container spacing={4}>
          {/* Основная информация */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Business sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold">
                    Информация о компании
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {companyInfo.fullName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Сокращенное наименование: {companyInfo.shortName}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Связь с автошколой
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <MuiLink href={`tel:${CONTACT_PHONE_TEL}`} color="inherit">
                        {companyInfo.phone}
                      </MuiLink>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button variant="contained" href={`tel:${CONTACT_PHONE_TEL}`}>
                      Позвонить
                    </Button>
                    <Button variant="outlined" href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </Button>
                    <Button variant="outlined" href={CONTACT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Telegram
                    </Button>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Руководство
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body1">
                      Директор: {companyInfo.director}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {companyInfo.directorBasis}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Адрес */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LocationOn sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold">
                    Адрес
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Юридический адрес
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {companyInfo.legalAddress}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Почтовый адрес
                  </Typography>
                  <Typography variant="body1">
                    {companyInfo.postalAddress}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Реквизиты */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccountBalance sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" component="h3" fontWeight="bold">
                    Реквизиты
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Идентификационные номера
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">ИНН:</Typography>
                          <Typography variant="body1">{companyInfo.inn}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">КПП:</Typography>
                          <Typography variant="body1">{companyInfo.kpp}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">ОГРН:</Typography>
                          <Typography variant="body1">{companyInfo.ogrn}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">ОКВЭД:</Typography>
                          <Typography variant="body1">{companyInfo.okved}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Банковские реквизиты
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">Банк:</Typography>
                          <Typography variant="body1">{companyInfo.bankInfo.bank}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">Расчетный счет:</Typography>
                          <Typography variant="body1">{companyInfo.bankInfo.account}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">Корр. счет:</Typography>
                          <Typography variant="body1">{companyInfo.bankInfo.correspondentAccount}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="medium">БИК:</Typography>
                          <Typography variant="body1">{companyInfo.bankInfo.bik}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Дополнительная информация */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Дополнительная информация
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Автошкола РУЛЬ+ предоставляет качественные образовательные услуги в области подготовки водителей транспортных средств различных категорий. 
                Мы гарантируем высокий уровень обучения и успешную сдачу экзаменов в ГИБДД.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactsPage; 