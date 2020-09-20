const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    greeting: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Greeting', GreetingSchema);