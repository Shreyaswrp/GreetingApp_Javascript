const GreetingMessage = require('../controller/greeting.controller.js');
var greeting = new GreetingMessage();

module.exports = (app) => {
    
    /**
     * Define a simple route to display Message at the homepage
     */
    app.get('/', (req, res) => {
        res.json({"message": "Welcome to Greeting application."});
    });
    
    /**
     * Define a simple route to display Message by the attributes provided
     */
    app.get("/greetingName/:firstName?/:lastName?", greeting.findGreetingByName);

    // Create a new Greeting
    app.post('/greetings', greeting.createGreeting);

    // Retrieve all Greetings
    app.get('/greetings', greeting.findAllGreetings);

    // Retrieve a single Greeting with greetingId
    app.get('/greetings/:greetingId', greeting.findOneGreeting);

    // Update a Greeting with greetingId
    app.put('/greetings/:greetingId', greeting.updateGreeting);

    // Delete a Greeting with greetingId
    app.delete('/greetings/:greetingId', greeting.deleteGreeting);
}
