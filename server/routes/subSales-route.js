const express = require('express');
const isAuth = require('../middleware/auth-middleware');
const { addSubSales } = require('../controllers/subSales-controller');

const router = express.Router();

router.post('/add', isAuth, addSubSales);

module.exports = router