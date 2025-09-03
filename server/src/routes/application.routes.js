const express = require('express');
const { submitApplication, testEmailConfig } = require('../controllers/application.controller.js');

const router = express.Router();

// Submit training application
router.post('/submit', submitApplication);

// Test email configuration
router.get('/test-email', testEmailConfig);

module.exports = router; 