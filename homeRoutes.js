const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/home', authMiddleware, (req, res) => {
  res.json({ message: `Welcome to the home page, user ID: ${req.userId}` });
});

module.exports = router;
