const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:placeId', placesControllers.getPlacesById);
router.get('/user/:uid',  placesControllers.getPlaceByUserID);

//STEP 1 add a new POST middlware
//note the order of this POST as last route
//the "slash nothing" path will accomodate any User or Places 
router.post('/', placesControllers.createPlace);

module.exports = router;

