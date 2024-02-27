const categoryRoute = require("../routes/category.router");
const errorHandler = require("../middleware/errorHandler");
const ApiError = require("../utils/apiError");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/v1/categories", categoryRoute);
    app.all("*", (req, res, next) => {
        next(new ApiError(`Page Not Found - ${req.method} ${req.url}`, 400));
    });
    app.use(/.*/, errorHandler);
};
