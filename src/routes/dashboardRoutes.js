const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const router = express.Router();
console.log('protect :', protect);
console.log('getDashboardData :', getDashboardData);

router.get('/', protect, getDashboardData );

module.exports = router;