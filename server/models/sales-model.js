const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    tax: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    dateOfSale: { type: Date, default: Date.now }
}, { timestamps: true });

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;