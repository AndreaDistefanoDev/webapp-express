const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");



// Get route [Index] to fetch all users from the database
router.get("/", userController.index);


// Get route [Show] to fetch a single user by ID from the database
router.get("/:id", userController.show);
module.exports = router;