const GreetingMessage = require('../controller/greeting.controller.js');
var greeting = new GreetingMessage();

module.exports = (app) => {
    
    /**
     * Define a simple route to display Message at the homepage
     */
    app.get('/', (req, res) => {
        res.json({"message": "Welcome to Greeting application."});
    });
    
    // Create a new Greeting
    app.post('/create-greeting', greeting.createGreeting);

    // Retrieve all Greetings
    app.get('/find-greetings', greeting.findAllGreetings);

    // Retrieve a single Greeting with greetingId
    app.get('/find-a-greeting/:greetingId', greeting.findOneGreeting);

    /**
     * Define a simple route to display Message by the attributes provided
     */
    app.get("/greeting-by-name/:firstName?/:lastName?", greeting.findGreetingByName);

    // Update a Greeting with greetingId
    app.put('/update-greeting/:greetingId', greeting.updateGreeting);

    // Delete a Greeting with greetingId
    app.delete('/delete-greeting/:greetingId', greeting.deleteGreeting);
}
