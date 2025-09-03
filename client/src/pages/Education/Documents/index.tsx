import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Button, Chip, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Description, GetApp, Visibility, CalendarToday, CheckCircle, Info } from '@mui/icons-material';
import { documentsApi, DocumentsData } from '../../../shared/api/documentsApi';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<DocumentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка документов с сервера
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        const response = await documentsApi.getDocuments();
        setDocuments(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки документов:', err);
        setError('Не удалось загрузить документы. Попробуйте позже.');
        // Fallback к моковым данным в случае ошибки
        setDocuments({
          charter: [],
          license: [],
          accreditation: [],
          regulations: [],
          reports: [],
          collective: [],
          prescriptions: [],
          lastUpdated: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleDownload = (fileUrl: string, fileName: string) => {
    documentsApi.downloadDocument(fileUrl, fileName);
  };

  const handleView = async (fileUrl: string) => {
    try {
      await documentsApi.viewDocument(fileUrl);
    } catch (error) {
      console.error('Ошибка при открытии документа:', error);
      alert('Не удалось открыть документ. Проверьте, что файл существует.');
    }
  };

  // Показ загрузки
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Загрузка документов...
        </Typography>
      </Container>
    );
  }

  // Показ ошибки
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  // Проверка наличия данных
  if (!documents) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info">
          Документы не найдены
        </Alert>
      </Container>
    );
  }

  const DocumentCard = ({ doc, category }: { doc: any, category: string }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {doc.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {doc.description}
            </Typography>
            
            {doc.status === 'not_required' ? (
              <Alert severity="info" sx={{ mt: 1 }}>
                Данный документ не требуется для программ профессионального обучения
              </Alert>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Загружен: {new Date(doc.uploadDate).toLocaleDateString('ru-RU')}
                      </Typography>
                    </Box>
                  </Grid>
                  {doc.fileSize && (
                    <Grid item>
                      <Chip label={doc.fileSize} size="small" variant="outlined" />
                    </Grid>
                  )}
                  {doc.expiryDate && (
                    <Grid item>
                      <Typography variant="body2" color="text.secondary">
                        Действует до: {new Date(doc.expiryDate).toLocaleDateString('ru-RU')}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Box>
          
          {doc.fileUrl && (
            <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                onClick={() => handleView(doc.fileUrl)}
              >
                Просмотр
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<GetApp />}
                onClick={() => handleDownload(doc.fileUrl, doc.title)}
              >
                Скачать
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Документы - РУЛЬ+ | СЕЛ - ПОЕХАЛ</title>
        <meta 
          name="description" 
          content="Документы автошколы РУЛЬ+: устав, лицензии, отчеты о самообследовании, правила внутреннего распорядка согласно требованиям Рособрнадзора." 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Заголовок страницы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Документы
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Основные документы образовательной организации для ознакомления и скачивания
          </Typography>
        </Box>

        {/* Информационное сообщение */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
            Все документы представлены в формате PDF. Для просмотра необходима программа для чтения PDF-файлов.
            При возникновении проблем с просмотром или скачиванием документов обращайтесь по телефону +7 (495) 123-45-67.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {/* Устав */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Description sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Устав образовательной организации
                  </Typography>
                </Box>
                {documents.charter.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} category="charter" />
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Лицензия */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircle sx={{ mr: 2, color: 'success.main' }} />
                  <Typography variant="h5" component="h2">
                    Лицензия на осуществление образовательной деятельности
                  </Typography>
                </Box>
                {documents.license.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} category="license" />
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Аккредитация */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Description sx={{ mr: 2, color: 'warning.main' }} />
                  <Typography variant="h5" component="h2">
                    Свидетельство о государственной аккредитации
                  </Typography>
                </Box>
                {documents.accreditation.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} category="accreditation" />
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Правила внутреннего распорядка */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Description sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Правила внутреннего распорядка
                  </Typography>
                </Box>
                {documents.regulations.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} category="regulations" />
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Отчеты о самообследовании */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Description sx={{ mr: 2, color: 'info.main' }} />
                  <Typography variant="h5" component="h2">
                    Отчеты о результатах самообследования
                  </Typography>
                </Box>
                {documents.reports.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} category="reports" />
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Коллективный договор */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Description sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h5" component="h2">
                    Коллективный договор
                  </Typography>
                </Box>
                {documents.collective.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} category="collective" />
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Предписания надзорных органов */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Description sx={{ mr: 2, color: 'warning.main' }} />
                  <Typography variant="h5" component="h2">
                    Предписания органов, осуществляющих государственный контроль (надзор) в сфере образования
                  </Typography>
                </Box>
                {documents.prescriptions.length > 0 ? (
                  documents.prescriptions.map((doc: any) => (
                    <DocumentCard key={doc.id} doc={doc} category="prescriptions" />
                  ))
                ) : (
                  <Alert severity="success">
                    Предписания органов государственного контроля (надзора) отсутствуют
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Сводная таблица документов */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Сводная информация о документах
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Наименование документа</strong></TableCell>
                    <TableCell><strong>Дата загрузки</strong></TableCell>
                    <TableCell><strong>Размер файла</strong></TableCell>
                    <TableCell><strong>Статус</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    ...documents.charter,
                    ...documents.license,
                    ...documents.regulations,
                    ...documents.reports,
                    ...documents.collective
                  ].map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>{doc.fileSize || '-'}</TableCell>
                      <TableCell>
                        <Chip 
                          label="Доступен" 
                          color="success" 
                          size="small"
                          icon={<CheckCircle />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {documents.accreditation.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Chip 
                          label="Не требуется" 
                          color="info" 
                          size="small"
                          icon={<Info />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Дата обновления */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Дата последнего обновления информации: {new Date(documents.lastUpdated).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default DocumentsPage; 