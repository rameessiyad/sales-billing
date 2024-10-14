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


    //#desc list all products
    //#route GET /api/v1/product
    listProducts: asyncHandler(async (req, res) => {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products: products
        });
    }),

    //@desc delete product
    //@route DELETE /api/v1/product/:id
    deleteProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })
    }),

    //@desc total products count
    //@route GET /api/v1/product/count
    totalProductsCount: asyncHandler(async (req, res) => {
        const count = await Product.countDocuments();
        res.status(200).json({
            success: true,
            count
        })
    })
}
