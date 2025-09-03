// Получить быструю статистику для админ панели
const getQuickStats = async (req, res) => {
  try {
    // В реальном приложении здесь будут запросы к базе данных
    // Пока используем моковые данные для демонстрации
    
    const stats = {
      activeStudents: 127,
      instructors: 8,
      vehicles: 16,
      documents: 15,
      totalStudents: 450,
      totalCourses: 12,
      totalRevenue: 2500000,
      completionRate: 85
    };

    res.json({
      status: 'success',
      data: stats,
      message: 'Статистика успешно загружена'
    });
  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении статистики'
    });
  }
};

// Получить детальную статистику
const getDetailedStats = async (req, res) => {
  try {
    // Здесь будет логика для получения детальной статистики
    const detailedStats = {
      studentsByMonth: [
        { month: 'Январь', count: 45 },
        { month: 'Февраль', count: 52 },
        { month: 'Март', count: 48 },
        { month: 'Апрель', count: 61 },
        { month: 'Май', count: 55 },
        { month: 'Июнь', count: 67 }
      ],
      revenueByMonth: [
        { month: 'Январь', amount: 450000 },
        { month: 'Февраль', amount: 520000 },
        { month: 'Март', amount: 480000 },
        { month: 'Апрель', amount: 610000 },
        { month: 'Май', amount: 550000 },
        { month: 'Июнь', amount: 670000 }
      ],
      courseCompletion: {
        'Категория B': 95,
        'Категория A': 88,
        'Категория C': 92
      }
    };

    res.json({
      status: 'success',
      data: detailedStats,
      message: 'Детальная статистика успешно загружена'
    });
  } catch (error) {
    console.error('Ошибка при получении детальной статистики:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении детальной статистики'
    });
  }
};

// Получить месячную статистику
const getMonthlyStats = async (req, res) => {
  try {
    const monthlyStats = {
      currentMonth: {
        newStudents: 23,
        completedCourses: 18,
        revenue: 345000,
        averageScore: 4.2
      },
      previousMonth: {
        newStudents: 19,
        completedCourses: 15,
        revenue: 298000,
        averageScore: 4.1
      },
      trends: {
        studentsGrowth: 21,
        revenueGrowth: 15.8,
        completionGrowth: 20
      }
    };

    res.json({
      status: 'success',
      data: monthlyStats,
      message: 'Месячная статистика успешно загружена'
    });
  } catch (error) {
    console.error('Ошибка при получении месячной статистики:', error);
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении месячной статистики'
    });
  }
};

module.exports = {
  getQuickStats,
  getDetailedStats,
  getMonthlyStats
}; 