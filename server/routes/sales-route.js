const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSale, listSales } = require('../controllers/sales-controller');

const router = express.Router();

router.post('/add', isAuth, addSale);
router.get('/', isAuth, listSales)

module.exports = router