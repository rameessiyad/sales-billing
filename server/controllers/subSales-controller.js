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

}
