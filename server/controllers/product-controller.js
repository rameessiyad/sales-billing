const Product = require('../models/product-model');
const asyncHandler = require('express-async-handler');

module.exports = {
    addProduct: asyncHandler(async (req, res) => {
        const product = req.body;
    })
}
