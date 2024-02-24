const morganLogger = require("./middleware/morganLogger");
const dbConnection = require("./config/database");
const express = require("express");
const dotenv = require("dotenv");

//  Initialize application and middleware
dotenv.config({ path: "./config.env" });

//  Connect to database
dbConnection();

// App Express
const app = express();

// Middlewares
morganLogger();

// Routes
require("./api/v1")(app);

// Create the server and listen on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${"http://localhost:" + PORT}`);
});
