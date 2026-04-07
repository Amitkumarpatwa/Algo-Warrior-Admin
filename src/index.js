require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT, ATLAS_DB_URL } = require("./config/server.config");
const apiRouter = require("./routes/index");
const seedAdmin = require("./utils/seedAdmin");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Ensure DB is connected before handling requests (critical for serverless)
let dbPromise = null;
async function ensureDbConnection() {
  if (mongoose.connection.readyState === 1) return; // already connected
  if (!dbPromise) {
    dbPromise = mongoose.connect(ATLAS_DB_URL).then(async () => {
      console.log("MongoDB connected successfully");
      await seedAdmin();
    }).catch((error) => {
      dbPromise = null; // reset so next request retries
      throw error;
    });
  }
  return dbPromise;
}

// DB connection middleware
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    console.error("DB connection error:", error.message);
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// Routes
app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem service is alive" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const BaseError = require("./errors/base.error");
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
      data: {},
    });
  }
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
    data: {},
  });
});

// Local development: listen on port
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
}

module.exports = app;
