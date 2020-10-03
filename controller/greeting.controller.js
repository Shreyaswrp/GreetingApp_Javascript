/*************************************************************
 *
 * Execution       : default node cmd> node greeting.controller.js
 * Purpose         : Define actions for various http methods
 *
 * @description    : Actions to be done when http methods are called. 
 *                   
 *                               
 * @file           : greeting.controller.js
 * @overview       : Actions of http methods
 * @module         : controller
 * @version        : 1.0
 * @since          : 16/11/2020
 *
 * **********************************************************/

const greetingService = require('../service/greetingService');
const Joi = require("joi");

class  GreetingMessage{

/**
   * Function to validate request
   * @param {*} message
   */
validateMessage = (message) => {
    const schema = Joi.object({
    greeting: Joi.string().min(3).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    });
    return schema.validate(message);
}

/**
 * controller to past request to create service
 * @param {httpRequest} req
 * @param {httpresponse} res
 * @param {callbackfunction} callback
 */
createGreeting = (req, res) => {

    var responseResult = {};
    // Validate request
    const { error } = this.validateMessage(req.body);
    if (error) {
        responseResult.success = false;
        responseResult.message = "Could not create a greeting";
        responseResult.error = errors;
        res.status(422).send(responseResult)
    }else{
        const contentGreeting = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            greeting: req.body.greeting
        }
    greetingService.createGreeting(contentGreeting, function(err, data) {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            responseResult.message = "Could not create a greeting";
            res.status(422).send(responseResult);
        }else{
            responseResult.success = true;
            responseResult.data = data;
            responseResult.message = "Greeting created successfully.";
            res.status(200).send(responseResult);
        }
    });
    }
}

/**
 * @params {object} data
 * Retrieve and return all greetings from the database.
 */

findAllGreetings = (req,res) => {
    var responseResult = {};
    greetingService.findAllGreetings(req.body, function(err, data) {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            responseResult.message = "Could not find greetings";
            res.status(422).send(responseResult);
        }else{
            responseResult.success = true;
            responseResult.data = data;
            responseResult.message = "Greetings found successfully.";
            res.status(200).send(responseResult);
        }
    });
}

/**
 * @params {object} data
 * Retrieve and return greetings by name from the database.
 */
findGreetingByName = (req, res) => {
    var responseResult = {};
    const contentGreeting = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        greeting: req.body.greeting
    }
    greetingService.findGreetingByName(contentGreeting, (err, data) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            responseResult.message = "Could not find greetings with the given name";
            res.status(422).send(responseResult);
        }else{
            responseResult.success = true;
            responseResult.data = data;
            responseResult.message = "Greeting by the name found successfully.";
            res.status(200).send(responseResult);
        }
    });
}

/**
 * @params {object} data
 * Retrieve and return a greeting from the database.
 */
findOneGreeting = (req, res) => {
    var responseResult = {};
    if(!req.params.greetingId) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    let regexConst = new RegExp(/^[a-fA-F0-9]{24}$/);
    if(!regexConst.test(req.params.greetingId)){
        return res.status(422).send({message: "Incorrect id.Give proper id. "});
    }
    greetingService.findOneGreeting(req.params.greetingId, function(err, data) {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            responseResult.message = "Could not find greetings with the given id";
            res.status(422).send(responseResult);   
        }else{
            responseResult.success = true;
            responseResult.data = data;
            responseResult.message = "Greeting by the id provided found successfully.";
            res.status(200).send(responseResult);
        }
    });
}

/**
 * @params {object} data
 * Update greetings from the database.
 */
updateGreeting = (req, res) => {
    var responseResult = {};
    if(!req.params.greetingId) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    let regexConst = new RegExp(/^[a-fA-F0-9]{24}$/);
    if(!regexConst.test(req.params.greetingId)){
        return res.status(422).send({message: "Incorrect id.Give proper id. "});
    }
    /*const greetingToUpdate = {
        _id: req.params.greetingId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        greeting: req.body.greeting
    }*/
    greetingService.updateGreeting(req.params.greetingId, req.body, function(err, data) {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            responseResult.message = "Could not update greeting with the given id";
            res.status(422).send(responseResult); 
        }else{
            responseResult.success = true;
            responseResult.data = data;
            responseResult.message = "Greeting updated successfully.";
            res.status(200).send(responseResult);
        }
    });
}

/**
 * @params {object} data
 * Delete greetings from the database.
 */
deleteGreeting = (req, res) => {
    var responseResult = {};
    if(!req.params.greetingId) {
        return res.send({message: "Greeting not found with the given id. "});
    }
    let regexConst = new RegExp(/^[a-fA-F0-9]{24}$/);
    if(!regexConst.test(req.params.greetingId)){
        return res.send({message: "Incorrect id.Give proper id. "});
    }
    greetingService.deleteGreeting(req.params.greetingId, function(err, data) {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            responseResult.message = "Could not update greeting with the given id";
            res.status(422).send(responseResult);
        }else{
            responseResult.success = true;
            responseResult.data = data;
            responseResult.message = "Greeting deleted ";
            res.status(200).send(responseResult);
        }
    });
}
}
module.exports = GreetingMessage;