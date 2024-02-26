const categoryRoute = require("../routes/category.router");
const errorHandler = require("../middleware/errorHandler");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/v1/categories", categoryRoute);
    app.all("*", (req, res, next) => {
        let err = new Error(`Not Found - ${req.method} ${req.url}`);
        err.status = 404;
        return next(err);
    });
    app.use(/.*/, errorHandler);
    // Catch all routes and pass to the error handler if a route doesn't exist or
    // isn't found or an internal server error occurs.
    // This must be included at the end of your middleware stack!
};
