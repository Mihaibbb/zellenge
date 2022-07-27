const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorResponse = require("../handlers/error");

exports.protect = async (req, res, next) => {

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) return;

    let token = req.headers.authorization.split(" ")[1]; // split for space: Bearer o5406i95uiehgrjdoi83uf -> take index 1

    if (!token) return next(new ErrorResponse("Not authorized to access this route"), 401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded});

        if (!user) return next(new ErrorResponse("No user found with this id", 404));

        
        req.user = user;

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
    
};