// Vercel serverless entry point - just re-exports the Express app
const app = require("../src/index.js");
module.exports = app;
