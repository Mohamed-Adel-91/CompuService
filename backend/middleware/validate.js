const ApiError = require("../utils/apiError");

const validate = (validator) => {
    return (req, res, next) => {
        //checking errors with validating request
        const { error } = validator(req.body);
        if (error) {
            next(new ApiError(`${error.message}`, 400));
            return;
        }
        next();
    };
};

module.exports = validate;
