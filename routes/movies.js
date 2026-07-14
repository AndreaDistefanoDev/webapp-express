const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");



// Get route [Index] to fetch all movies from the database
router.get("/", movieController.index);


// Get route [Show] to fetch a single movie by ID from the database
router.get("/:id", movieController.show);


// Post route [Store] to add a new movie to the database
router.post("/", movieController.store);


// Post route [Store Review] to add a new review to a movie in the database
router.post("/:id/reviews", movieController.storeReview);
module.exports = router;

