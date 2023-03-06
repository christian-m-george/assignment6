//note that there are different versions
//we will use V4 that will have a time timestamp component 
const { v4: uuidv4 } = require('uuid');

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

//STEP 1; add a new controller for POST route
const createPlace = (req, res, next) => {

    //for a POST request we expect to have data in the body 
    //GET request do not have body, POST request do have body
    //we can use the "body-parser" package 

    //We will use object descructuring 
    //which is a default modern JS feature that NodeJS supports
    //to get differnt properties out of request body 
    //and store it in functions that are now available in the function
    const { title, description, coordinates, adress, creator } = req.body;
    //NOTE this is a shorthand notation for 
    //const title = req.body.title;

    //STEP 2: creat a new place 
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        adress,
        creator
    };

    //now we can add this to our dummy collection
    //Push = add to last element
    //Unshift = add to the head as the first element
    DUMMY_PLACES.push(createdPlace);

    //Next, send back a resports
    //201 is that something has been CREATED on the server
    //we will also return back the created place for feedback
    res.status(201).json({place: createdPlace});

}

//Need to add this to our exports bundle
exports.createPlace = createPlace;


exports.getPlacesById = getPlacesById;
exports.getPlaceByUserID = getPlaceByUserID;
