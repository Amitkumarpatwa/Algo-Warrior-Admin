const winston = require("winston");
const { LOGGER_DB_URL } = require("./server.config.js");

const allowedTransports = [];

// Console transport - always safe
allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf(
        (log) => `${log.timestamp} [${log.level}]: ${log.message}`,
      ),
    ),
  }),
);

// MongoDB transport - only if URL is available
if (LOGGER_DB_URL) {
  try {
    require("winston-mongodb");
    allowedTransports.push(
      new winston.transports.MongoDB({
        level: "error",
        db: LOGGER_DB_URL,
        collection: "logs",
      }),
    );
  } catch (error) {
    console.log("Winston MongoDB transport initialization failed:", error.message);
  }
}

// CosmosDB custom stream transport - only if not in production (avoid crash on Vercel)
if (process.env.NODE_ENV !== "production") {
  try {
    const { Writable } = require("stream");
    const logToCosmosDB = require("../clientApis/cosmosClient.js");

    const customStream = new Writable({
      write(chunk, encoding, callback) {
        const message = chunk.toString();
        console.log("Log intercepted in custom transport:", message);
        logToCosmosDB("error", message);
        callback();
      },
    });
    const customStreamTransport = new winston.transports.Stream({
      stream: customStream,
    });
    allowedTransports.push(customStreamTransport);
  } catch (error) {
    console.log("CosmosDB stream transport initialization failed:", error.message);
  }
}

// File transport - only in development (Vercel has a read-only filesystem)
if (process.env.NODE_ENV !== "production") {
  allowedTransports.push(
    new winston.transports.File({
      filename: "app.log",
    }),
  );
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`,
    ),
  ),
  transports: allowedTransports,
});

module.exports = logger;
