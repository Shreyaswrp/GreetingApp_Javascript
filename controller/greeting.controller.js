const Greeting = require('../app/models/greeting.model.js');

// Create and Save a new Greeting
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Greeting content can not be empty"
        });
    }

    // Create a Greeting
    const greeting = new Greeting({
        title: req.body.title || "Untitled Greeting", 
        content: req.body.content
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
};

// Retrieve and return all greetings from the database.
exports.findAll = (req, res) => {
    Greeting.find()
    .then(greetings => {
        res.send(greetings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving greetings."
        });
    });
};

// Find a single greeting with a greetingId
exports.findOne = (req, res) => {
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
};

// Update a greeting identified by the greetingId in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body.content) {
    return res.status(400).send({
        message: "Greeting content can not be empty"
    });
}

// Find greeting and update it with the request body
Greeting.findByIdAndUpdate(req.params.greetingId, {
    title: req.body.title || "Untitled Greeting",
    content: req.body.content
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
};

// Delete a greeting with the specified greetingId in the request
exports.delete = (req, res) => {
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
};