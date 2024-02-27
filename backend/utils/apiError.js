//@desc this class is responsible for operations errors (errors that i can predict)
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
        this.isOperational = true;
        // to make stack trace available for error tracking services (e.g., Sentry)
        Error.captureStackTrace(this, ApiError);
    }
}

module.exports = ApiError;
