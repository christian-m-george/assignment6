import express from "express";

//STEP 1: import express validator
//we need object destructoring to import the CHECK method
//CHECK method is actually a fucntion we can execute
//it will actually return a new middleware configured for our validation requirements
import { check } from "express-validator";
import {
  getPlaceByUserID,
  getPlacesById,
  createPlace,
  getAllPlaces,
  updatePlace,
  deletePlace,
} from "../controllers/places-controllers.js";

// const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/", getAllPlaces);


router.get("/:placeId", getPlacesById);
router.get("/user/:uid", getPlaceByUserID);

//STEP 1: note that we can register multiple (chained) middle ware on same Method + Path combination
//Example: we want to ensure "title" is not empty
router.post(
  "/",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("adress").notEmpty(),
  ],
  createPlace
);

router.put("/:placeId", updatePlace);


router.delete("/:placeId", deletePlace);

export default router;
