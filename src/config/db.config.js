const mongoose = require("mongoose");
const { NODE_ENV, ATLAS_DB_URL } = require("./server.config.js");

async function connectToDB() {
  try {
    if (NODE_ENV == "development") {
      await mongoose.connect(ATLAS_DB_URL);
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.log("Unable to connect to the DB server");
    console.log(error);
    throw error; // Re-throw so caller knows connection failed
  }
}

module.exports = connectToDB;
