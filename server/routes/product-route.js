const express = require('express');
const { addProduct, listProducts, deleteProduct } = require('../controllers/product-controller');
const isAuth = require('../middleware/auth-middleware');
const { upload } = require('../utils/image-upload');

const router = express.Router();

router.post('/add', isAuth, upload.single('image'), addProduct);
router.get('/', isAuth, listProducts);
router.delete('/:id', isAuth, deleteProduct);

module.exports = router