const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSale } = require('../controllers/sales-controller');

const router = express.Router();

router.post('/add', isAuth, addSale);

module.exports = router