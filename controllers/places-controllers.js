//STEP 1: need to import "validator result" from Express-Validator package
// import e from "express";
import { validationResult } from "express-validator";

import { v4 } from "uuid";

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Rowan Univerity",
    description: "Best university in the nation!",
    location: {
      lat: 39.709973,
      lng: -75.1213819,
    },
    adress: "201 Mullica Hill Rd, Glassboro, NJ 08028",
    creator: "userId1",
  },
];

export const getAllPlaces = (req, res, next) => {
  if (DUMMY_PLACES.length === 0) {
    return res.json({ message: "There are no places" });
  } else {
    return res.json(DUMMY_PLACES);
  }
};

export const getPlacesById = (req, res, next) => {
  const placeId = req.params.placeId; // {placeId: 'p1'}

  //we can get our place using Dummy places
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  //STEP 1 modify for error handling below
  if (!place) {
    //return res.status(404).json({message: 'Could not find a place for given ID'});
    const error = new Error("Coult not find a place for the provided ID");
    error.code = 404;
    throw error; //this will triggler ERROR handling middleware
  }

  res.json({ place }); // equivelant => { place } => { place: place }
};

export const getPlaceByUserID = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    //return res.status(404).json({message: 'Could not find a place for given user ID'});
    const error = new Error("Coult not find a place for the provided ID");
    error.code = 404;

    return next(error); //this will triggler ERROR handling middleware
  }

  //return the response with the place that matches UserID
  res.json({ place });
};

export const createPlace = (req, res, next) => {
  //STEP 2 at beginning we will call validation result as a function
  //pass the request to this
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //lets output errors to see more detail errors
    console.log(errors);
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check post data" });
  }

  const { title, description, coordinates, adress, creator } = req.body;
  const createdPlace = {
    id: v4(),
    title,
    description,
    location: coordinates,
    adress,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return res.json({
      message: "PUT request must contain a body with new values",
    });
  const { placeId } = req.params;
  const placeIndex = DUMMY_PLACES.findIndex((place) => {
    return place.id == placeId;
  });
  if (placeIndex < 0) {
    return res.json({ message: "No place exists with the specified id" });
  } else {
    const place = DUMMY_PLACES[placeIndex];
    console.log(req.body);
    Object.keys(req.body).forEach((key) => {
      place[`${key}`] = req.body[`${key}`];
    });
    DUMMY_PLACES[placeIndex] = place;
    return res.json(place);
  }
};

export const deletePlace = (req, res, next) => {
  const { placeId } = req.params;
  const placeIndex = DUMMY_PLACES.findIndex((place) => {
    return place.id == placeId;
  });
  if (placeIndex < 0) {
    return res.json({ message: "No place exists with the specified id" });
  } else {
    DUMMY_PLACES = DUMMY_PLACES.filter((place) => {
      return place.id !== placeId;
    });
    res.json({ message: `Request with ID ${placeId} has been deleted` });
  }
};
