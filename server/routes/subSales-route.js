const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSubSales, listSubSales, increaseQuantity } = require('../controllers/subSales-controller');

const router = express.Router();

router.post('/add', isAuth, addSubSales);
router.get('/', isAuth, listSubSales);
router.put('/increase-quantity', isAuth, increaseQuantity);

module.exports = router