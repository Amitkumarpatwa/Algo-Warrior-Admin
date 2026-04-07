const { CosmosClient } = require('@azure/cosmos');
const { ENDPOINT, KEY } = require('../config/server.config.js');

const databaseId = "logging-store";
const containerId = "error-logs";

let container = null;

function getContainer() {
  if (!container && ENDPOINT && KEY) {
    try {
      const client = new CosmosClient({ endpoint: ENDPOINT, key: KEY });
      const database = client.database(databaseId);
      container = database.container(containerId);
    } catch (error) {
      console.log("CosmosDB client initialization failed:", error.message);
    }
  }
  return container;
}

async function logToCosmosDB(level, message) {
  try {
    const c = getContainer();
    if (!c) {
      console.log("CosmosDB not available, skipping log");
      return;
    }
    await c.items.create({
      timeStamp: new Date().toISOString(),
      level: level,
      message: message,
    });
    console.log("Log entry created in cosmos Db");
  } catch (error) {
    console.log("Error logging to cosmos db");
  }
}

module.exports = logToCosmosDB;
