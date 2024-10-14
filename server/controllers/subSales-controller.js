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

    //#desc increasw product quantity
    //@route PUT /api/v1/sub-sales/increase-quantity
    increaseQuantity: asyncHandler(async (req, res) => {
        const { productId, quantity, subSalesId } = req.body;

        if (!subSaleId || !productId || !quantityToAdd) {
            return res.status(400).json({
                success: false,
                message: 'SubSale ID, Product ID, and quantity to add are required',
            });
        };

        // Find the SubSale
        const subSale = await SubSales.findById(subSaleId);
        if (!subSale) {
            return res.status(404).json({
                success: false,
                message: 'SubSale not found',
            });
        };

        // Find the product in the SubSale
        const productIndex = subSale.products.findIndex(product => product.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in SubSale',
            });
        };

        // Increase quantity
        subSale.products[productIndex].quantity += quantityToAdd;
        const totalPrice = subSale.products[productIndex].pricePerUnit * subSale.products[productIndex].quantity;
        subSale.products[productIndex].totalPrice = totalPrice;

        // Update the total amount
        const totalAmount = subSale.products.reduce((acc, product) => acc + product.totalPrice, 0) + subSale.tax;

        subSale.totalAmount = totalAmount;
        await subSale.save();

        res.status(200).json({
            success: true,
            message: 'Product quantity updated successfully',
            subSale,
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
