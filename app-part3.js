const express = require('express');
const bodyParser = require('body-parser');

//lets get our places routes
//this is now a middleware
const placesRoutes = require('./routes/places-routes');

const app = express(); 

//can use places routes as middleware
//app.use(placesRoutes);
app.use('/api/places', placesRoutes); 

//STEP 1: express default error handler
//this does not need a path filter
//this is a middlware that will apply on every incoming request 
//If you add a 4th arugment, Express will try this as a special ERROR handling middlware function
//that means that this function will only be excuted on requests that have an ERROR attached to it
//where an error has been thrown
app.use((error, req, res,next) => {

        //check if a response and headers attached to it has already been sent
        if(res.headerSent) {
            return next(error);
        }

        //check if on the error object we are getting if COD property is defined
        res.status(error.code || 500);  

        //add an object that has a message property
        //every error that we send back from API should have a messsage property 
        //which attached client can then use to show an error message to their users
        //NOTE: this is a convention to other REST API in the real world
        res.json( { message: error.message || 'An unknown error occured'  });

});

app.listen(3001);