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
    app.post('/creategreeting', greeting.createGreeting);

    // Retrieve all Greetings
    app.get('/findgreetings', greeting.findAllGreetings);

    // Retrieve a single Greeting with greetingId
    app.get('/findagreeting/:greetingId', greeting.findOneGreeting);

    /**
     * Define a simple route to display Message by the attributes provided
     */
    app.get("/greetingname/:firstName?/:lastName?", greeting.findGreetingByName);

    // Update a Greeting with greetingId
    app.put('/updategreeting/:greetingId', greeting.updateGreeting);

    // Delete a Greeting with greetingId
    app.delete('/deletegreeting/:greetingId', greeting.deleteGreeting);
}
