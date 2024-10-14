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
    price: {
        type: Number,
        required: true,
    },
});

const SubSales = mongoose.model('SubSales', subSalesSchema);
module.exports = SubSales;
