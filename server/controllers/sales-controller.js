const Sale = require('../models/sales-model');
const asyncHandler = require('express-async-handler');

module.exports = {
    //#desc add sale
    //#route POST /api/v1/sales/add
    addSale: asyncHandler(async (req, res) => {
        const { products, tax, customer } = req.body;

        if (!products || !tax || !customer) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //calculate total amount for products
        const totalProductAmount = products.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0);

        //calculate total amount with tax
        const totalAmount = totalProductAmount + tax;

        const newSale = new Sale({
            products,
            tax,
            totalAmount,
            customer
        });

        await newSale.save();

        res.status(201).json({
            success: true,
            message: 'Sale added successfully',
            sale: newSale
        });
    }),

    //#desc list all sales
    //@route GET /api/v1/sales
    listSales: asyncHandler(async (req, res) => {
        const sales = await Sale.find();
        res.status(200).json({
            success: true,
            sales,
        })
    }),

    //@desc list latest 5 sales
    //@route GET /api/v1/sales/latest
    listLatestSales: asyncHandler(async (req, res) => {
        const sales = await Sale.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            success: true,
            sales
        })
    }),

    ///@desc total sales count
    //@route GET /api/v1/sales/count
    totalSalesCount: asyncHandler(async (req, res) => {
        const count = await Sale.countDocuments();
        res.status(200).json({
            success: true,
            count
        })
    })
}
