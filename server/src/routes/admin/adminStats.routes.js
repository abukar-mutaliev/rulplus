import express from 'express';
import { 
  getQuickStats, 
  getDetailedStats, 
  getMonthlyStats 
} from '../../controllers/admin/adminStats.controller.js';

const router = express.Router();

// Маршруты для статистики админ панели
router.get('/quick', getQuickStats);
router.get('/detailed', getDetailedStats);
router.get('/monthly', getMonthlyStats);

export default router; 