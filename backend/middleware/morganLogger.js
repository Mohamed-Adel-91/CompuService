const express = require("express");
const app = express();
const morgan = require("morgan");

module.exports = function () {
    if (process.env.NODE_ENV !== "production") {
        app.use(morgan("dev")); // log to console for development
        console.log(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);
    } else {
        app.use(
            morgan("common", {
                skip: function (req, res) {
                    return res.statusCode < 400;
                },
            })
        ); // only log errors for production
        app.use(morgan("short")); // log to file in production
    }
};
