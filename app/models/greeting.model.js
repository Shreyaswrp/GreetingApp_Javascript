const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Greeting', GreetingSchema);