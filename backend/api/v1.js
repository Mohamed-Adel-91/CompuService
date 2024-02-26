const categoryRoute = require("../routes/category.router");
const errorHandler = require("../middleware/errorHandler");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());
    app.use(errorHandler);
    app.use("/api/v1/categories", categoryRoute);
};
