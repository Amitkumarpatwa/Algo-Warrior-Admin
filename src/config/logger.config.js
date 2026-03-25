const winston = require("winston");
const { LOGGER_DB_URL } = require("./server.config.js");
require("winston-mongodb");
//when direct integration not available like mongoDb the we use this
const { Writable } = require("stream");
const logToCosmosDB = require("../clientApis/cosmosClient.js");

const allowedTransports = [];

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

//the below transports config. enables logging on the console
allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      //custom formatting
      winston.format.colorize(),

      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      //its define what is exactly going to print
      winston.format.printf(
        (log) => `${log.timestamp} [${log.level}]: ${log.message}`,
      ),
    ),
  }),
);
// below transports config. enables logging on the mongoDb database

allowedTransports.push(
  new winston.transports.MongoDB({
    level: "error",
    db: LOGGER_DB_URL,
    collection: "logs",
  }),
);

allowedTransports.push(
  new winston.transports.File({
    filename: "app.log",
  }),
);

const logger = winston.createLogger({
  // default formatting
  format: winston.format.combine(
    //first argument to the combine method is defining how we want the timestamp to come up
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    //its define what is exactly going to print
    winston.format.printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`,
    ),
  ),
  transports: allowedTransports,
});

module.exports = logger;
