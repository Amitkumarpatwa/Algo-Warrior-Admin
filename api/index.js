// Vercel Serverless Function entry point
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Lazy DB connection - ensures it only connects once
let dbReady = null;

async function ensureDbConnection() {
  if (dbReady) return dbReady;
  
  const { ATLAS_DB_URL } = require("../src/config/server.config");
  
  dbReady = mongoose.connect(ATLAS_DB_URL).then(async () => {
    console.log("MongoDB connected successfully (serverless)");
    const seedAdmin = require("../src/utils/seedAdmin");
    await seedAdmin();
  });
  
  return dbReady;
}

// Middleware: connect to DB before every request
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    console.error("DB connection error:", error.message);
    res.status(500).json({ success: false, message: "Database connection failed: " + error.message });
  }
});

const apiRouter = require("../src/routes/index");

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem service is alive" });
});

// Error handler
const { StatusCodes } = require("http-status-codes");
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong",
    data: {},
  });
});

module.exports = app;
