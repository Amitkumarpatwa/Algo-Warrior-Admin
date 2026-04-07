// Vercel Serverless Function entry point
require("dotenv").config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const { ATLAS_DB_URL } = require("../src/config/server.config");
const apiRouter = require("../src/routes/index");
const errorHandler = require("../src/utils/errorHandler");
const seedAdmin = require("../src/utils/seedAdmin");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Ensure DB is connected before handling requests
let dbConnected = false;
async function ensureDbConnection() {
  if (!dbConnected && mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(ATLAS_DB_URL);
      console.log("MongoDB connected successfully (serverless)");
      await seedAdmin();
      dbConnected = true;
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      throw error;
    }
  }
}

// Middleware: connect to DB before every request
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem service is alive" });
});

app.use(errorHandler);

module.exports = app;
