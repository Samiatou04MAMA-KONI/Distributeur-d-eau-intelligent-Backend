const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Route publique pour l'ESP32
router.post('/', addTransaction);

// Route protégée pour l'admin
router.get('/', protect, getTransactions);

module.exports = router;