const express = require('express');
const bodyParser = require('body-parser');

//lets get our places routes
//this is now a middleware
const placesRoutes = require('./routes/places-routes');

const app = express(); 

//can use places routes as middleware
app.use(placesRoutes);

app.listen(3001);