const winston = require("winston");

// Global error handling middleware
function errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    if (!err.message) {
        winston.info(`ERROR: ${err}`);
        err.message = "Internal server error";
    }
    err.status = err.status || "error";

    // log the exception
    //error - warn - info - verbose - debug - silly
    winston.error(err.message, err);
    winston.info(err.message);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });

    next();
}

module.exports = errorHandler;
// this middleware  will catch any errors that are not caught by other middlewares
// and handle them accordingly.
// Catch all routes and pass to the error handler if a route doesn't exist or
// isn't found or an internal server error occurs.
// This must be included at the end of your middleware stack!
