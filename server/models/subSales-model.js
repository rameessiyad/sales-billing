const mongoose = require('mongoose');

const subSalesSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            productName: {
                type: String,
                required: true,
            },
            pricePerUnit: {
                type: String,
                required: true,
            },
            totalPrice: {
                type: String,
                required: true,
            },
        },
    ],
    tax: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const SubSales = mongoose.model('SubSales', subSalesSchema);
module.exports = SubSales;
