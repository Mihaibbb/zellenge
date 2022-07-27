const ErrorResponse = require("../handlers/error");

const DUPLICATE_ARRKEY_ERR = 11000;
const VALID_ERR = "Validation Error";
const SERVER_ERR_CODE = 500;

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;
    
    if (err.code == DUPLICATE_ARRKEY_ERR) {
        const message = `Duplicate Field Value Enter`;
        error = new ErrorResponse(message, 400);
    }

    if (err.name === VALID_ERR) {
        const message = Object.values(err.errors).map(val => val.message);
        console.log("Error message name: ", message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.status || SERVER_ERR_CODE).json({
        success: false,
        error: error.message || "Server Error"
    });
};

module.exports = errorHandler;