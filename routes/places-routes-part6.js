const express = require('express');

//STEP 4
const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

//STEP 3 remove DUMMY_PLACES to the places controller file

//STEP 1 remove the function implementation below and move into controllers file
router.get('/:placeId', placesControllers.getPlacesById);

//STEP 2 remove the function below and move into controllers file
router.get('/user/:uid',  placesControllers.getPlaceByUserID);

//NOTE: the order of ROUTES matters 
//FOR EXAMPLE:  if '/:pid' and /users, the '/:pid" route would consume this in advance
module.exports = router;

