const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    products: [
        {
            productName: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            pricePerUnit: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
        }
    ],
    customer: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
