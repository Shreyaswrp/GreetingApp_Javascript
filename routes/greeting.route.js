const GreetingMessage = require('../controller/greeting.controller.js');

module.exports = (app) => {
    const greetingMsg = require('../controller/greeting.controller.js');
    var greeting = new greetingMsg();

    /**
     * Define a simple route to display Message at the homepage
     */
    app.get('/', (req, res) => {
        res.json({"message": "Welcome to Greeting application."});
    });
    
    /**
     * Define a simple route to display Message by the attributes provided
     */
    app.get("/greetingName/:fname?/:lname?", greeting.findByName);

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
