/*************************************************************
 *
 * Execution       : default node cmd> node server.js
 * Purpose         : Run a nodejs server and connect to a database server
 *
 * @description    : Creates a app using express ,and add two body-parser middlewares 
 *                   using express’s app.use() method. We connect to the database using mongoose.
 *                   We run a nodejs server which listens on port number 3000. 
 *                   
 *
 * @file           : server.js
 * @overview       : Run a nodejs server and connect to a database server
 * @module         : greeting_app
 * @version        : 1.0
 * @since          : 16/11/2020
 *
 * **********************************************************/

const express = require('express');
const bodyParser = require('body-parser');

/**
 * create express app
 */
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./routes/greeting.route.js')(app);

require('./config/database.config.js');

require('dotenv/config');

/**
 * listen for requests
 */
const PORT = process.env.port || 3000;
app.listen( PORT, () => {
    console.log("Server is listening on port"+" " +PORT);
});