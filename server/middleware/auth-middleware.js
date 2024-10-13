const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const isAuth = async (req, res, next) => {
    let token;

    //get token from cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else {
        console.log('No token found');
        return res.status(401).json({
            success: false,
            message: 'No token found'
        })
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}

module.exports = isAuth