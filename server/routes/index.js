const express = require('express');
const router = express.Router();

const userRoute = require('./user-route');
const productRoute = require('./product-route');
const salesRoute = require('./sales-route');

router.use('/user', userRoute);
router.use('/product', productRoute)
router.use('/sales', salesRoute);

module.exports = router