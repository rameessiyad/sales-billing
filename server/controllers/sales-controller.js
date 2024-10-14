const Sales = require('../models/sales-model');
const SubSales = require('../models/subSales-model');
const asyncHandler = require('express-async-handler');

module.exports = {
    //#desc add sale
    //#route POST /api/v1/sales/add
    addSale: asyncHandler(async (req, res) => {
        const { customer, subSalesId } = req.body;

        if (!customer || !subSalesId) return res.status(400).json({
            success: false,
            message: 'Customer name is required'
        });

        // Find the SubSales data
        const subSale = await SubSales.findById(subSalesId).populate('products.productId');

        if (!subSale) {
            return res.status(404).json({
                success: false,
                message: 'SubSale not found.',
            });
        }

        // Create a new Sales record
        const newSale = new Sales({
            customer,
            products: subSale.products.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                pricePerUnit: item.pricePerUnit,
                totalPrice: item.totalPrice,
            })),
            totalAmount: subSale.totalAmount,
            tax: subSale.tax,
        });

        await newSale.save();

        // Delete the SubSales data after saving to Sales
        await SubSales.findByIdAndDelete(subSalesId);

        res.status(201).json({
            success: true,
            message: 'Sale created successfully',
            sale: newSale,
        });
    }),

    //#desc list all sales
    //@route GET /api/v1/sales
    listSales: asyncHandler(async (req, res) => {
        const sales = await Sales.find();
        res.status(200).json({
            success: true,
            sales,
        })
    }),

    //@desc list latest 5 sales
    //@route GET /api/v1/sales/latest
    listLatestSales: asyncHandler(async (req, res) => {
        const sales = await Sales.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            success: true,
            sales
        })
    }),

    ///@desc total sales count
    //@route GET /api/v1/sales/count
    totalSalesCount: asyncHandler(async (req, res) => {
        const count = await Sales.countDocuments();
        res.status(200).json({
            success: true,
            count
        })
    }),

    //@desc get sale by id
    //@route GET /api/v1/sales/:id
    getSaleById: asyncHandler(async (req, res) => {
        const sale = await Sales.findById(req.params.id);
        res.status(200).json({
            success: true,
            sale
        })
    }),
}
