import express from 'express';
import { submitApplication, testEmailConfig } from '../controllers/application.controller.js';

const router = express.Router();

// Submit training application
router.post('/submit', submitApplication);

// Test email configuration
router.get('/test-email', testEmailConfig);

export default router; 