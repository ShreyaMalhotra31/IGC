// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController'); // Import controller functions
const router = express.Router();

// POST routes for login (Session-based and Token-based)
router.post('/login/session', authController.loginWithSession); // Ensure this function exists in authController.js
router.post('/login/token', authController.loginWithToken); // Ensure this function exists in authController.js

// Export router
module.exports = router;

