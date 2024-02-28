require("express-async-errors"); // Middleware for handling errors in async functions must be first line
const express = require("express");
const morganLogger = require("./start/morganLogger");
const dbConnection = require("./config/database");
const dotenv = require("dotenv");
const winston = require("winston");

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

// Create the server and listen on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    const logger = `Server is running on ${"http://localhost:" + PORT}`;
    winston.info(logger);
    console.log(logger);
});

// Global Error Handling
process.on("unhandledRejection", (err) => {
    const logger = `Unhandled Rejection Errors: ${err.name} \n ${err.message} \n ${err.stack} `;
    winston.error(logger);
    console.log(logger);
    process.exit(1);
});
