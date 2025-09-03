const express = require('express');
const {
  getQuickStats,
  getDetailedStats,
  getMonthlyStats
} = require('../../controllers/admin/adminStats.controller.js');

const router = express.Router();

// Маршруты для статистики админ панели
router.get('/quick', getQuickStats);
router.get('/detailed', getDetailedStats);
router.get('/monthly', getMonthlyStats);

module.exports = router; 