import nodemailer from 'nodemailer';

// Email configuration для Яндекс.Почты
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // используем SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const submitApplication = async (req, res) => {
  try {
    // Логируем переменные окружения для диагностики
    console.log('🔧 Environment variables:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
    
    // Проверяем наличие переменных окружения
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ EMAIL_USER или EMAIL_PASS не установлены');
      return res.status(500).json({
        status: 'error',
        message: 'Настройки email не настроены'
      });
    }

    const {
      firstName,
      lastName,
      middleName,
      phone,
      email,
      birthDate,
      programId,
      preferredStartDate,
      additionalInfo
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !birthDate || !programId) {
      return res.status(400).json({
        status: 'error',
        message: 'Не все обязательные поля заполнены'
      });
    }

    // Get program details based on programId
    const programs = {
      1: { category: 'B', name: 'Категория B - Легковые автомобили', cost: 35000 },
      2: { category: 'A', name: 'Категория A - Мотоциклы', cost: 25000 },
      3: { category: 'C', name: 'Категория C - Грузовые автомобили', cost: 45000 }
    };

    const selectedProgram = programs[programId];
    if (!selectedProgram) {
      return res.status(400).json({
        status: 'error',
        message: 'Неверная программа обучения'
      });
    }

    // Format the email content
    const emailContent = `
      <h2>Новая заявка на обучение</h2>
      
      <h3>Личные данные:</h3>
      <p><strong>ФИО:</strong> ${lastName} ${firstName} ${middleName || ''}</p>
      <p><strong>Дата рождения:</strong> ${new Date(birthDate).toLocaleDateString('ru-RU')}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      
      <h3>Выбранная программа:</h3>
      <p><strong>Категория:</strong> ${selectedProgram.category}</p>
      <p><strong>Название:</strong> ${selectedProgram.name}</p>
      <p><strong>Стоимость:</strong> ${selectedProgram.cost.toLocaleString('ru-RU')} ₽</p>
      
      ${preferredStartDate ? `<p><strong>Желаемая дата начала:</strong> ${new Date(preferredStartDate).toLocaleDateString('ru-RU')}</p>` : ''}
      
      ${additionalInfo ? `<h3>Дополнительная информация:</h3><p>${additionalInfo}</p>` : ''}
      
      <hr>
      <p><em>Заявка отправлена ${new Date().toLocaleString('ru-RU')}</em></p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'amurklan@mail.ru',
      subject: `Новая заявка на обучение - ${selectedProgram.category}`,
      html: emailContent
    };

    // Создаем transporter и отправляем email
    const transporter = createTransporter();
    
    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log('📧 Email sent successfully');
    } catch (emailError) {
      console.error('📧 Email sending error:', emailError);
      throw emailError;
    }
    
    // Логируем отправку email
    console.log('📧 EMAIL SENT SUCCESSFULLY:');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To: amurklan@mail.ru');
    console.log('Subject:', `Новая заявка на обучение - ${selectedProgram.category}`);

    // Log the application (in a real app, you'd save to database)
    console.log('Application submitted:', {
      applicant: `${lastName} ${firstName} ${middleName}`,
      program: selectedProgram.name,
      email: email,
      phone: phone,
      timestamp: new Date().toISOString()
    });

    res.json({
      status: 'success',
      message: 'Заявка успешно отправлена',
      data: {
        applicantName: `${lastName} ${firstName}`,
        program: selectedProgram.name
      }
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при отправке заявки. Попробуйте снова позже.'
    });
  }
};

// Тестовый endpoint для проверки email настроек
const testEmailConfig = async (req, res) => {
  try {
    console.log('🔧 Testing email configuration:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({
        status: 'error',
        message: 'EMAIL_USER или EMAIL_PASS не установлены',
        emailUser: process.env.EMAIL_USER,
        emailPassSet: !!process.env.EMAIL_PASS
      });
    }
    
    // Проверяем подключение к SMTP
    const testTransporter = createTransporter();
    
    // Проверяем соединение
    await testTransporter.verify();
    
    res.json({
      status: 'success',
      message: 'Email configuration is working',
      emailUser: process.env.EMAIL_USER,
      emailPassSet: !!process.env.EMAIL_PASS
    });
  } catch (error) {
    console.error('Email configuration test failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Email configuration test failed',
      error: error.message
    });
  }
};

export { submitApplication, testEmailConfig }; 