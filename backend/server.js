const express = require("express");
require("express-async-errors");
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
    winston.info(`Server is running on ${"http://localhost:" + PORT}`);
});
