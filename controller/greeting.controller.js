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
 * @params {object} data
 * Create and Save a new Greeting
 */
createGreeting = (req, res) => {
        
        const { error } = this.validateMessage(req.body);
        
        if (error) return res.status(400).send(error.details[0].message);
        greetingService.createGreeting = (req.body, (err, result) => {
            console.log(req.body)
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Greeting."
                });
            }else{
                res.send(result);
            }
        });
}

/**
 * @params {object} data
 * Retrieve and return all greetings from the database.
 */

findAllGreetings = (req, res) => {
    greetingService.findAllGreetings = (req.body, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving greetings."
            });
        }else{
            responseResult.success = true;
            responseResult.result = result
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
    greetingService.findGreetingByName = (req.body, (err, result) => {
        if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(422).send(responseResult)
        }else{
            responseResult.success = true;
            responseResult.result = result
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
    greetingService.findOneGreeting = (req.body, (err, result) => {
        if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(422).send(responseResult)
        }else{
            responseResult.success = true;
            responseResult.result = result
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
    greetingService.updateGreeting = (req.body, (err, result) => {
        if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(422).send(responseResult)
        }else{
            responseResult.success = true;
            responseResult.result = result
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
    greetingService.deleteGreeting = (req.body, (err, result) => {
        if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(422).send(responseResult)
        }else{
            responseResult.success = true;
            responseResult.result = result
            res.status(200).send(responseResult);
        }
        });
}
}
module.exports = GreetingMessage;