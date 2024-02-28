const winston = require("winston");
const { format, transports } = winston;
const DailyRotateFile = require("winston-daily-rotate-file");

module.exports = function () {
    // Define a custom replacer function for JSON.stringify
    const replacer = (key, value) => {
        if (typeof value === "object" && value !== null) {
            // Recursively format nested objects
            return JSON.stringify(value, replacer, 2); // Add indentation for better readability
        } else {
            // Replace newlines with escaped newline characters
            return value.replace(/\n/g, "\\n");
        }
    };

    const myFormat = format.combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.align(),
        format.simple({ message: "%msg", level: "%level%", spacer: "  " }), // Add spaces between parts
        format.metadata({ fill: " " }), // Add padding to metadata
        format.json({ replacer })
    );

    // Configure winston-daily-rotate-file options
    const dailyRotateOptions = {
        filename: "logs/logfile-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true, // Optionally enable archive compression
        maxSize: "20m", // Rotate the log file when it reaches 20 megabytes
        maxFiles: "14d", // Keep a maximum of 14 days of rotated logs
    };

    // Use daily rotating transport for both uncaughtException and logFile
    winston.exceptions.handle(
        new DailyRotateFile(dailyRotateOptions),
        new winston.transports.File({
            filename: "logs/uncaughtException.log",
            format: myFormat,
        })
    );

    winston.add(new DailyRotateFile(dailyRotateOptions));
};
