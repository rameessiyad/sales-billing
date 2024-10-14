const User = require('../models/user-model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generate-token');

module.exports = {

    //@desc Register new user
    //@route POST /api/v1/user/signup
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

    //@desc Login user
    //@route POST /api/v1/user/login
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        })

        //check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({
            success: false,
            message: 'Incorrect password'
        })

        //generate token
        const token = generateToken(res, user._id);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                username: user.username,
                email: user.email,
                token: token
            }
        });
    }),

    //@desc logout user
    //@route POST /api/v1/user/logout
    logoutUser: asyncHandler(async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'Logged out'
        });
    })
}