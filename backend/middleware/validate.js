const validate = (validator) => {
    return (req, res, next) => {
        //checking errors with validating request
        const { error } = validator(req.body);
        if (error) return res.status(400).json(error.message);
        next();
    };
};

module.exports = validate;
