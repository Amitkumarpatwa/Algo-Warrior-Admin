require("dotenv").config();
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { PORT } = require("./config/server.config");
const apiRouter = require("./routes/index");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config.js");
const seedAdmin = require("./utils/seedAdmin");
const logger = require("./config/logger.config.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// If any request comes and route start with /api we map it apiRouter
app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem service is alive" });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);

    try {
      await connectToDB();
      await seedAdmin(); // Seed initial admin credentials
    } catch (error) {
      logger.error("Failed to connect to database");
    }
  });
} else {
  // For Vercel Serverless Function execution
  connectToDB()
    .then(() => seedAdmin())
    .catch((error) => logger.error("Failed to connect to DB in serverless mode"));
}

module.exports = app;
