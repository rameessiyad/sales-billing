const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    subSales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSales',
        required: true,
    }],
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
