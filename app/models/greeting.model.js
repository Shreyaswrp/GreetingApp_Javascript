const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    greeting: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Greeting', GreetingSchema);