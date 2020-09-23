const Greeting = require('../app/models/greeting.model.js');

/**
 * @params {object} data
 * @params {callback function} callback
 */
exports.createGreeting = (data,callback) => {
    Greeting.createGreeting(data,function(err, data) {
        if (err) {
            callback(err,null);
        } else {
            callback(null,data);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
exports.findAllGreetings = (data,callback) => {
    Greeting.findAllGreetings(data,function(err, data) {
        if (err) {
            callback(err,null);
        } else {
            callback(null, data);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
exports.findGreetingByName = (data, callback) => {
    Greeting.findGreetingByName(data, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
exports.findOneGreeting = (data, callback) => {
    Greeting.findOneGreeting(data, (err, result) => {
        if (err) {
            callback(err,null)
        } else {
            callback(null, result);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
exports.updateGreeting = (data, callback) => {
    Greeting.updateGreeting(data, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
exports.deleteGreeting = (data, callback) => {
    Greeting.deleteGreeting(data, (err, result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null, result);
        }
    })
}

