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

    // Validate request
    const { error } = this.validateMessage(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const greetingContent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        greeting: req.body.greeting
    }
    greetingService.createGreeting(greetingContent, function(err, data) {
        if (err) {
            return callback(err,null);
        }else{
            res.send(data);
        }
    });
}

/**
 * @params {object} data
 * Retrieve and return all greetings from the database.
 */

findAllGreetings = (req,res) => {
    greetingService.findAllGreetings(req.body,function(err, data) {
        if (err) {
            return callback(err,null);
        }else{
            res.send(data);
        }
    });
}

/**
 * @params {object} data
 * Retrieve and return greetings by name from the database.
 */
findGreetingByName = (req, res) => {
    greetingService.findGreetingByName(req.body, (err, result) => {
        if (err) {
            return callback(err,null);
        }else{
            res.status(200).send(result);
        }
    });
}

/**
 * @params {object} data
 * Retrieve and return a greeting from the database.
 */
findOneGreeting = (req, res) => {
    if(!req.params.greetingId) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    let regexConst = new RegExp(/^[a-fA-F0-9]{24}$/);
    if(!regexConst.test(req.params.greetingId)){
        return res.send({message: "Incorrect id.Give proper id. "});
    }
    greetingService.findOneGreeting(req.params.greetingId, function(err, data) {
        if (err) {
            return callback(err,null);
        }else{
            res.status(200).send(data);
        }
    });
}

/**
 * @params {object} data
 * Update greetings from the database.
 */
updateGreeting = (req, res) => {
    if(!req.params.greetingId) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    let regexConst = new RegExp(/^[a-fA-F0-9]{24}$/);
    if(!regexConst.test(req.params.greetingId)){
        return res.send({message: "Incorrect id.Give proper id. "});
    }
    const greetingToUpdate ={
        id: req.params.greetingId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        greeting: req.body.greeting
    }
    greetingService.updateGreeting(greetingToUpdate, function(err, result) {
        if (err) {
            return callback(err,null);
        }else{
            res.status(200).send(result);
        }
    });
}

/**
 * @params {object} data
 * Delete greetings from the database.
 */
deleteGreeting = (req, res) => {
    if(!req.params.greetingId) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    let regexConst = new RegExp(/^[a-fA-F0-9]{24}$/);
    if(!regexConst.test(req.params.greetingId)){
        return res.send({message: "Incorrect id.Give proper id. "});
    }
    greetingService.deleteGreeting(req.params.greetingId, function(err, result) {
        if (err) {
            return callback(err,null);
        }else{
            res.status(200).send(result);
        }
    });
}
}
module.exports = GreetingMessage;