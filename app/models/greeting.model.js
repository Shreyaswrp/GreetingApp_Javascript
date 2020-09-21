const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    greeting: String
}, {
    timestamps: true
});

class Greeting{

/**
 * Create and Save a new Greeting
 */
createGreeting = (data,callback) => {
    console.log("7777");
    // Create a Greeting
    const greeting = new GreetingSchema({
        firstName: data.firstName,
        lastName: data.lastName, 
        greeting: data.greeting
    });
    
    // Save Greeting in the database
    greeting.save()
    .then(data => {
        callback(null,data)
        //res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Greeting."
        });
    });
}

/**
 * Retrieve and return all greetings from the database.
 */
findAllGreetings = (data,callback) => {
    GreetingSchema.find()
    .then(greetings => {
        res.send(greetings);
        callback(null,greetings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving greetings."
        });
    });
}

/**
 * Find a greeting with a name
 */
findGreetingByName = (data,callback) => {
    let result = 0;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    if (!lname) {
      lname = "";
    }
    if (!fname) {
      fname = "";
    }
    result = fname + " " + lname +" " +"Hello World ";
    res.send(result);
    callback(null,result);
}

/**
 * Find a single greeting with a greetingId
 */
findOneGreeting = (data,callback) => {
    GreetingSchema.findById(req.params.greetingId)
    .then(greeting => {
        if(!greeting) {
            return res.status(404).send({
                message: "Greeting not found with id " + req.params.greetingId
            });            
        }
        res.send(greeting);
        callback(null,greeting);
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
updateGreeting = (data,callback) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Greeting content can not be empty"
        });
    }
    GreetingSchema.findByIdAndUpdate(req.params.greetingId, {
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
    callback(null,greeting);
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
deleteGreeting = (data,callback) => {
    GreetingSchema.findByIdAndRemove(req.params.greetingId)
    .then(greeting => {
    if(!greeting) {
        return res.status(404).send({
            message: "Greeting not found with id " + req.params.greetingId
        });
    }
    res.send({message: "Greeting deleted successfully!"});
    callback(null,"Greeting deleted successfully!")
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

module.exports = new Greeting();