const categoryRoute = require("../routes/category.router");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/v1/categories", categoryRoute);
};
