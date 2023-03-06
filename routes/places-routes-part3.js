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

    res.json({place}); // equivelant => { place } => { place: place }

})


//STEP 1 lets register a route for /user/:uid
router.get('/user/:uid', (req, res, next) => {

    //Now we want to get the user ID and find the place where 
    //create has that UserID
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    
    //return the response with the place that matches UserID
    res.json({place});

});

//NOTE: the order of ROUTES matters 
//FOR EXAMPLE:  if '/:pid' and /users, the '/:pid" route would consume this in advance

module.exports = router;

