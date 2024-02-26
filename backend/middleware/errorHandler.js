const winston = require("winston");

function errorHandler(err, req, res, next) {
    // log the exception
    winston.error(err.message, err);
    //error - warn - info - verbose - debug - silly
    winston.info(err.message);
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
    next();
}

module.exports = errorHandler;
// this middleware  will catch any errors that are not caught by other middlewares and handle them accordingly.
