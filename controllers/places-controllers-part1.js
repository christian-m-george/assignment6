//STEP 3 
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


//alternative definitions
//function getPlaceById() { ... }
//const getPlaceById = function() { ... }
//we will use the arrow function below 


//STEP 1
const getPlacesById = (req, res, next) => {

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
};


//STEP 2 
const getPlaceByUserID = (req, res, next) => {

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

};

//NOTE we do not need to import express in this controller

//NOTE we learned that we can export using modules.exports,
//but we need to export multiple function 
//these will be bundled all into an single object for export which holds points to the functions
exports.getPlacesById = getPlacesById;
exports.getPlaceByUserID = getPlaceByUserID;
