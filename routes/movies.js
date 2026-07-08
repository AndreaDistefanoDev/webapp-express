const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");



// Get route [Index] to fetch all movies from the database
router.get("/", movieController.index);


// Get route [Show] to fetch a single movie by ID from the database
router.get("/:id", movieController.show);
module.exports = router;