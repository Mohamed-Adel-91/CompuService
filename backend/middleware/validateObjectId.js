const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");

function validateObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(new ApiError("No valid object ID provided.", 404));
        return;
    }
    next();
}

module.exports = validateObjectId;
// this middleware check if id is valid or not in the database
