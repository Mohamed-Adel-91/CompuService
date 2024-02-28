const winston = require("winston");
require("express-async-handler");
require("express-async-errors");

// Global error handling middleware
function errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    if (!err.message) {
        winston.info(`ERROR: ${err}`);
        err.message = "Internal server error";
    }
    err.status = err.status || "error";

    // log the errors
    //error - warn - info - verbose - debug - silly
    winston.error(err.message + "\n" + err.stack);

    if (process.env.NODE_ENV === "development") {
        sendErrorForDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        sendErrorForProd(err, res);
    } else {
        // Default response
        res.status(500).json({
            status: "error",
            message: "An error occurred",
        });
    }
}

// Development environment error handler,
// sends a stack trace to client with status code and message

const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const sendErrorForProd = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

module.exports = errorHandler;
// this middleware  will catch any errors that are not caught by other middlewares
// and handle them accordingly.
// Catch all routes and pass to the error handler if a route doesn't exist or
// isn't found or an internal server error occurs.
// This must be included at the end of your middleware stack!
