const express = require('express');
const { addProduct } = require('../controllers/product-controller');

const router = express.Router();

router.post('/add', addProduct);

module.exports = router