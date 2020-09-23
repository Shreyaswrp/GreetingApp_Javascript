const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    greeting: String
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
    // Create a Greeting
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
    Greeting.find(function(err,data) {
        if(err)return callback(err,null);
        return callback(null,data);
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
findOneGreeting = (data,callback) => {
    Greeting.findById(data,function(err,data){
        if(err)return callback(err,null);
        return callback(null,data);
    })
}

/**
 * Update a greeting identified by the greetingId in the request
 */
updateGreeting = (data,callback) => {
    try{
    Greeting.findByIdAndUpdate(data, {
        firstName: data.firstName,
        lastName: data.lastName,
        greeting: data.greeting
    }, {new: true})
        callback(null,data);
    }catch(err){
        callback(err,null);
    }
}

/**
 * Delete a greeting with the specified greetingId in the request
 */
deleteGreeting = (data,callback) => {
    try{
    Greeting.findByIdAndRemove(data)
    callback(null,"Greeting deleted successfully!")
    }catch(err){
        callback(err,null);
    }
}
}

module.exports = new GreetingModel();