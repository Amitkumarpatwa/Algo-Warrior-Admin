const mongoose = require("mongoose");
const { NODE_ENV, ATLAS_DB_URL } = require("./server.config.js");
const logger = require("./logger.config.js");

async function connectToDB() {
  try {
    await mongoose.connect(ATLAS_DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    logger.error("Unable to connect to the DB server");
    logger.error(error.message);
    throw error; // Re-throw so caller knows connection failed
  }
}

module.exports = connectToDB;
