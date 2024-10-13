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
    })
}
