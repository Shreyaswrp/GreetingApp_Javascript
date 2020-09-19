module.exports = (app) => {
    const greeting = require('../controller/greeting.controller.js');

    // Create a new Greeting
    app.post('/greetings', greeting.create);

    // Retrieve all Greetings
    app.get('/greetings', greeting.findAll);

    // Retrieve a single Greeting with greetingId
    app.get('/greetings/:greetingId', greeting.findOne);

    // Update a Greeting with greetingId
    app.put('/greetings/:greetingId', greeting.update);

    // Delete a Greeting with greetingId
    app.delete('/greetings/:greetingId', greeting.delete);
}