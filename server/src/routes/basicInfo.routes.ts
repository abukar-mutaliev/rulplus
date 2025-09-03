import { Router } from 'express';
import { 
  getBasicInfo, 
  updateBasicInfo, 
  getBasicInfoHistory 
} from '../controllers/basicInfo.controller.js';

const router = Router();

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