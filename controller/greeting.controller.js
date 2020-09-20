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

const Greeting = require('../app/models/greeting.model.js');
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
 * Create and Save a new Greeting
 */
create = (req, res) => {
    const { error } = this.validateMessage(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create a Greeting
    const greeting = new Greeting({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        greeting: req.body.greeting
    });

    // Save Greeting in the database
    greeting.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Greeting."
        });
    });
}

/**
 * Retrieve and return all greetings from the database.
 */
findAll = (req, res) => {
    Greeting.find()
    .then(greetings => {
        res.send(greetings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving greetings."
        });
    });
}

/**
 * Find a greeting with a name
 */
findByName = (req, res) => {
    let result = 0;
    let fname = req.body.firstName;
    let lname = req.body.lastName;
    if (!lname) {
      lname = "";
    }
    if (!fname) {
      fname = "";
    }
    result = fname + " " + lname +" " +"Hello World ";
    res.send(result);
}

/**
 * Find a single greeting with a greetingId
 */
findOne = (req, res) => {
    Greeting.findById(req.params.greetingId)
    .then(greeting => {
        if(!greeting) {
            return res.status(404).send({
                message: "Greeting not found with id " + req.params.greetingId
            });            
        }
        res.send(greeting);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Greeting not found with id " + req.params.greetingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving greeting with id " + req.params.greetingId
        });
    });
}

/**
 * Update a greeting identified by the greetingId in the request
 */
update = (req, res) => {
// Validate Request
if(!req.body.content) {
    return res.status(400).send({
        message: "Greeting content can not be empty"
    });
}

/**
 * Find greeting and update it with the request body
 */
Greeting.findByIdAndUpdate(req.params.greetingId, {
    id: req.body.title || "Untitled Greeting",
    greeting: req.body.content
}, {new: true})
.then(greeting => {
    if(!greeting) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    res.send(greeting);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });                
    }
    return res.status(500).send({
        message: "Error updating greeting with id " + req.params.greetingId
    });
});
}

/**
 * Delete a greeting with the specified greetingId in the request
 */
delete = (req, res) => {
        Greeting.findByIdAndRemove(req.params.greetingId)
        .then(greeting => {
        if(!greeting) {
            return res.status(404).send({
                message: "Greeting not found with id " + req.params.greetingId
            });
        }
        res.send({message: "Greeting deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Greeting not found with id " + req.params.greetingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete greeting with id " + req.params.greetingId
        });
        });
}
}
module.exports = GreetingMessage;