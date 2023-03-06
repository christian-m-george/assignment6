//you must register (import) express in every file that uses it
//if we need something from express then we have to import
const express = require('express');

//need a special tool 
//this gives us a special object at which we can register middleware
//we then can export our configured router and import this in App.JS
//can register entired configured ROUTER in App.JS
const router = express.Router();

//this is a METHOD + FILTER 
//next is callback FUNCTION 
router.get('/', (req, res, next) => {
    console.log('GET Request from our places route');
    
    //send back a response that contains JSON data
    //we use the JSON method on the response object
    //JSON method takes any data which can be converted to valid JSON (object, array, number, boolean)
    res.json({message: 'This is some json data'}); //we will just create a "message" object
})

//need link this to the AppJS file
//need to establish connection between AppJS and Route files
//need to export our configured router using "export" syntax
module.exports = router;

