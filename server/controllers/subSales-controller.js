const SubSales = require('../models/subSales-model');
const Product = require('../models/product-model');
const asyncHandler = require('express-async-handler');

module.exports = {
    //#desc  add new subSales
    //@route POST /api/v1/sub-sales/add
    addSubSales: asyncHandler(async (req, res) => {
        const { products, tax } = req.body;

        if (!products || products.length === 0 || !tax) {
            return res.status(400).json({
                success: false,
                message: 'Products and Tax are required',
            });
        };

        const subSalesProducts = [];
        let totalAmount = 0;

        for (const product of products) {
            const { productId, quantity } = product;

            // Fetch product details from the database
            const productDetails = await Product.findById(productId);
            if (!productDetails) {
                return res.status(400).json({
                    success: false,
                    message: 'Product not found',
                });
            }

            // Check stock availability
            if (productDetails.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient stock for product: ' + productDetails.name,
                });
            }

            const totalPrice = productDetails.price * quantity;

            subSalesProducts.push({
                productId: productDetails._id,
                productName: productDetails.name,
                quantity,
                pricePerUnit: productDetails.price,
                totalPrice,
            });

            // Update total amount
            totalAmount += totalPrice;

            // Decrease the product stock
            productDetails.stock -= quantity;
            await productDetails.save();
        }

        totalAmount += tax;

        const newSubSale = new SubSales({
            products: subSalesProducts,
            tax,
            totalAmount,
        });

        await newSubSale.save();

        res.status(201).json({
            success: true,
            message: 'SubSale created successfully',
            subSale: newSubSale,
        });
    }),


    //@desc list subSales
    //@route GET /api/v1/sub-sales
    listSubSales: asyncHandler(async (req, res) => {
        const subSales = await SubSales.find();
        res.status(200).json({
            success: true,
            subSales
        })
    }),

}
