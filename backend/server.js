require("express-async-errors"); // Middleware for handling errors in async functions must be first line
const express = require("express");
const morganLogger = require("./start/morganLogger");
const dbConnection = require("./config/database");
const dotenv = require("dotenv");
const winston = require("winston");
const errorHandler = require("./middleware/errorHandler");

//  Initialize application and middleware
dotenv.config({ path: "./config.env" });

//  Connect to database
dbConnection();

// App Express
const app = express();

// Middlewares
morganLogger();

// Routes
require("./start/logging")(); // Logging initialization
require("./api/v1")(app);
app.use(/.*/, errorHandler); // Catch all routes

// Create the server and listen on port 8000
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    const logger = `Server is running on ${"http://localhost:" + PORT}`;
    winston.info(logger);
    console.log(logger);
});

// Global Error Handling from rejections outside express
process.on("unhandledRejection", (err) => {
    const logger = `Unhandled Rejection Errors: ${err.name} \n ${err.message} \n ${err.stack} `;
    winston.error(logger);
    console.error(logger);
    server.close(() => {
        const logger =
            "Application Shutting Down due to unhandled promise rejections ....!!";
        winston.error(logger);
        console.error(logger);
        process.exit(1);
    });
});
