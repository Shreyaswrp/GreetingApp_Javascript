/**
 * Configuring the database
 */
require('dotenv/config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Connecting to the database
 */
const DB_CONFIG = mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.DB_CONFIG;