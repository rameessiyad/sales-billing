const mongoose = require('mongoose');

const subSalesSchema = new mongoose.Schema({
    product: {
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
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const SubSales = mongoose.model('SubSales', subSalesSchema);
module.exports = SubSales;
