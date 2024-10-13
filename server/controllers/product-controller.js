const Product = require('../models/product-model');
const asyncHandler = require('express-async-handler');
const { getFileUrl } = require('../utils/image-upload');

module.exports = {
    //#desc  add new product
    //#route POST /api/v1/product/add
    addProduct: asyncHandler(async (req, res) => {
        const { name, price, stock } = req.body;

        const imageUrl = req.file ? getFileUrl(req, req.file) : null;
        const product = new Product({
            name,
            price,
            stock,
            image: imageUrl
        });

        await product.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully'
        });
    }),

    //#desc get all products
    //#route GET /api/v1/product
    getProducts: asyncHandler(async (req, res) => {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    })
}
