const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSubSales, listSubSales, increaseQuantity, decreaseQuantity } = require('../controllers/subSales-controller');

const router = express.Router();

router.post('/add', isAuth, addSubSales);
router.get('/', isAuth, listSubSales);
router.patch('/increase-quantity', isAuth, increaseQuantity);
router.patch('/decrease-quantity', isAuth, decreaseQuantity);

module.exports = router