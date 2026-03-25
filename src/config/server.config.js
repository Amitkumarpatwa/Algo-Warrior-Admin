const dotenv= require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT || 3000,
    ATLAS_DB_URL:process.env.ATLAS_DB_URL,
    LOGGER_DB_URL:process.env.LOGGER_DB_URL,
    KEY:process.env.KEY,
    ENDPOINT:process.env.ENDPOINT,
    NODE_ENV:process.env.NODE_ENV || 'development'
}