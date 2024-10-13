const express = require('express');
const { addProduct } = require('../controllers/product-controller');
const isAuth = require('../middleware/auth-middleware');
const { upload } = require('../utils/image-upload');

const router = express.Router();

router.post('/add', isAuth, upload.single('image'), addProduct);

module.exports = router