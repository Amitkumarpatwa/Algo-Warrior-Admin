const { CosmosClient }=require('@azure/cosmos');
const { ENDPOINT, KEY } = require('../config/server.config.js');

//connecting your code ti cosmos db
const endpoint=ENDPOINT;
const key=KEY;
const databaseId="logging-store";
const containerId="error-logs";

const client= new CosmosClient({endpoint,key});
const database=client.database(databaseId);
const container=database.container(containerId);

async function logToCosmosDB(level,message) {
    try {
        // structure of the document we will store in cosmos db
        await container.items.create({
            timeStamp:new Date().toISOString(),
            level:level,
            message:message
        });
        console.log("Log entry created in cosmos Db");
        
    } catch (error) {
        console.log("Error logging to cosmos db");
        
    }
    
}
module.exports = logToCosmosDB;
