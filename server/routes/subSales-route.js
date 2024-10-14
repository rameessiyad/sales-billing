const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSubSales, listSubSales, increaseQuantity, decreaseQuantity } = require('../controllers/subSales-controller');

const router = express.Router();

router.post('/add', isAuth, addSubSales);
router.get('/', isAuth, listSubSales);

module.exports = router