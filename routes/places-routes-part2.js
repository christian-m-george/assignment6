//you must register (import) express in every file that uses it
//if we need something from express then we have to import
const express = require('express');

//need a special tool 
//this gives us a special object at which we can register middleware
//we then can export our configured router and import this in App.JS
//can register entired configured ROUTER in App.JS
const router = express.Router();

//PART 2 
const DUMMY_PLACES = [
    {
    id: 'p1',
    title: 'Rowan Univerity',
    description: 'Best university in the nation!',
    location: {
        lat: 39.709973,
        lng: -75.1213819,
    },
    adress: "201 Mullica Hill Rd, Glassboro, NJ 08028",
    creator: 'userId1'
    }
];

//lets have get request where the ID is part of the URL path
//the ID should be encoded in the URL 
//to tell express that we have a dynamic segment where we don't know the exact value in advance
//STEP 1 we add a "colon" in the filter and any identifer of our choice as below
router.get('/:placeId', (req, res, next) => {

    //STEP 2 need to extract the concreate value that was entered for this concrete request that reaches this function
    //we can get the place ID by uisng the request object as below
    const placeId = req.params.placeId; // {placeId: 'p1'}

    //we can get our place using Dummy places 
    const place = DUMMY_PLACES.find(p => {
        //return true if we reach the place we are looking for
        //comparing place we are looking compared to part of our URL
        return p.id === placeId;
    });

    //STEP 3 return a resonse of the place 
    res.json({place}); // equivelant => { place } => { place: place }


    // console.log('GET Request from our places route');
    
    // //send back a response that contains JSON data
    // //we use the JSON method on the response object
    // //JSON method takes any data which can be converted to valid JSON (object, array, number, boolean)
    // res.json({message: 'This is some json data'}); //we will just create a "message" object
})

//need link this to the AppJS file
//need to establish connection between AppJS and Route files
//need to export our configured router using "export" syntax
module.exports = router;

