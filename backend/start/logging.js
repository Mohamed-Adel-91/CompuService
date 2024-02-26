const winston = require("winston");
const { format } = winston;
require("express-async-errors");

module.exports = function () {
    // Add exception handler
    winston.exceptions.handle(
        new winston.transports.Console({
            format: winston.format.simple(),
            colorize: true,
            prettyPrint: true,
        }),
        new winston.transports.File({
            filename: "uncaughtException.log",
            format: format.combine(format.timestamp(), format.json()),
        })
    );

    // Add rejection handler
    process.on("unhandledRejection", (ex) => {
        throw ex; // Let unhandled promise rejections crash the process
    });

    winston.add(
        new winston.transports.Console({
            format: winston.format.simple(),
            colorize: true,
            prettyPrint: true,
            handleExceptions: true,
            handleRejections: true,
        })
    );

    winston.add(
        new winston.transports.File({
            filename: "logFile.log",
            format: format.combine(format.timestamp(), format.json()),
            handleExceptions: true,
            handleRejections: true,
        })
    );

    // Add console transport for test environment
    if (process.env.NODE_ENV === "test") {
        winston.add(
            new winston.transports.Console({
                format: winston.format.simple(),
                colorize: true,
                prettyPrint: true,
            })
        );
    }
};