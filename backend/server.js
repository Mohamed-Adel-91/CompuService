const morganLogger = require("./middleware/morganLogger");
const dbConnection = require("./config/database");
const express = require("express");
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

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Create the server and listen on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    winston.info(`Server is running on ${"http://localhost:" + PORT}`);
});
