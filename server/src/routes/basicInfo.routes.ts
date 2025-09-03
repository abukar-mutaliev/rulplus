import { Router } from 'express';

const router = Router();

// Временные заглушки для контроллеров
const getBasicInfo = (_req: any, res: any) => {
  res.json({
    status: 'success',
    data: {
      organizationName: 'РУЛЬ+ Автошкола',
      address: 'г. Назрань',
      phone: '+7 (928) 697-06-97',
      email: 'info@rulplus.ru'
    }
  });
};

const updateBasicInfo = (_req: any, res: any) => {
  res.json({ status: 'success', message: 'Информация обновлена' });
};

const getBasicInfoHistory = (_req: any, res: any) => {
  res.json({ status: 'success', data: [] });
};

/**
 * @route   GET /api/info/basic
 * @desc    Получить основные сведения об организации
 * @access  Public
 */
router.get('/', getBasicInfo);

/**
 * @route   PUT /api/info/basic
 * @desc    Обновить основные сведения об организации
 * @access  Private (Admin only)
 */
router.put('/', updateBasicInfo);

/**
 * @route   GET /api/info/basic/history
 * @desc    Получить историю изменений основных сведений
 * @access  Private (Admin only)
 */
router.get('/history', getBasicInfoHistory);

export default router; 