const express = require('express');
const router = express.Router();

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

router.get('/:placeId', (req, res, next) => {

    const placeId = req.params.placeId; // {placeId: 'p1'}

    //we can get our place using Dummy places 
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    //STEP 1 modify for error handling below
    if(!place) {
        //return res.status(404).json({message: 'Could not find a place for given ID'});
        const error = new Error('Coult not find a place for the provided ID');
        error.code = 404; 
        throw error; //this will triggler ERROR handling middleware
    }

    res.json({place}); // equivelant => { place } => { place: place }
})


router.get('/user/:uid', (req, res, next) => {

    //Now we want to get the user ID and find the place where 
    //create has that UserID
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    //STEP 2 modify to handle ERROR using NEXT 
    if(!place) {
  
        //return res.status(404).json({message: 'Could not find a place for given user ID'});
        const error = new Error('Coult not find a place for the provided ID');
        error.code = 404; 

        //this will forwad to the next Middleware in line 
        //it will reach the next error middlware in line
        //NOTE: return to enforce only one response at a time
        return next(error); //this will triggler ERROR handling middleware
    }

    
    //return the response with the place that matches UserID
    res.json({place});

});

//NOTE: the order of ROUTES matters 
//FOR EXAMPLE:  if '/:pid' and /users, the '/:pid" route would consume this in advance
module.exports = router;

