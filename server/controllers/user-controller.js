const User = require('../models/user-model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

module.exports = {
    registerUser: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        //hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    }),


}