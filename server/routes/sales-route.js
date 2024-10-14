const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSale, listSales, listLatestSales, totalSalesCount, getSaleById, deleteSale } = require('../controllers/sales-controller');

const router = express.Router();

router.post('/add', isAuth, addSale);
router.get('/', isAuth, listSales);
router.get('/latest', isAuth, listLatestSales)
router.get('/count', isAuth, totalSalesCount)
router.get('/:id', isAuth, getSaleById);

module.exports = router