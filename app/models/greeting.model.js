const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    greeting: {
        type: String,
        min: 3,
        required: true
    },
    firstName: {
        type: String,
        min: 3,
        required: true
    },
    lastName: {
        type: String,
        min: 3,
        required: true
    },
}, {
    timestamps: true
});

var Greeting = mongoose.model("Greeting", GreetingSchema);

class GreetingModel{

/**
 * Create and Save a new Greeting
 */
createGreeting = (data,callback) => {
    try{
    const greeting = new Greeting({
        firstName: data.firstName,
        lastName: data.lastName, 
        greeting: data.greeting
    });
    // Save Greeting in the database
    greeting.save()
    callback(null,greeting);
    }catch(err){
    callback(err,null);
    }
}

/**
 * Retrieve and return all greetings from the database.
 */
findAllGreetings = (data,callback) => {
    Greeting.find(data,function(err,result) {
        if(err)return callback(err,null);
        return callback(null,result);
    })
}

/**
 * Find a greeting with a name
 */
findGreetingByName = (data,callback) => {
    try{
    let result = 0;
    let firstName = data.firstName;
    let lastName = data.lastName;
    if (!lastName) {
      lastName = "";
    }
    if (!firstName) {
      firstName = "";
    }
    result = firstName + " " + lastName +" " +"Hello World ";
    callback(null,result);
    }catch(err){
        callback(err,null);
    }
}

/**
 * Find a single greeting with a greetingId
 */
findOneGreeting = (idGreeting,callback) => {
    Greeting.findById(idGreeting,function(err,data){
        if(err)return callback(err,null);
        return callback(null,data);
    })
}

/**
 * Update a greeting identified by the greetingId in the request
 */
updateGreeting = (idGreeting,callback) => {
    try{
    Greeting.findByIdAndUpdate({_id: idGreeting.id}, {
        firstName: idGreeting.firstName,
        lastName: idGreeting.lastName,
        greeting: idGreeting.greeting
    }, {new: true})
        callback(null,idGreeting);
    }catch(err){
        callback(err,null);
    }
}

/**
 * Delete a greeting with the specified greetingId in the request
 */
deleteGreeting = (idGreeting,callback) => {
    try{
    Greeting.findByIdAndRemove(idGreeting)
    callback(null,"Greeting deleted successfully!")
    }catch(err){
        callback(err,null);
    }
}
}

module.exports = new GreetingModel();