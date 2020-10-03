const Greeting = require('../app/models/greeting.model.js');

class GreetingService{
/**
 * @params {object} data
 * @params {callback function} callback
 */
createGreeting = (data,callback) => {
    Greeting.createGreeting(data,function(err, result) {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
findAllGreetings = (data,callback) => {
    Greeting.findAllGreetings(data,function(err, result) {
        if (err) {
            callback(err,null);
        } else {
            callback(null, result);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
findGreetingByName = (data, callback) => {
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
findOneGreeting = (data, callback) => {
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
updateGreeting = (id, data, callback) => {
    Greeting.updateGreeting(id, data, (err, result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null, result);
        }
    })
}

/**
 * @params {object} data
 * @params {callback function} callback
 */
deleteGreeting = (data, callback) => {
    Greeting.deleteGreeting(data, (err, result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null, result);
        }
    })
}
}

module.exports = new GreetingService();