const express = require("express");
const router = express.Router();

// Aquiring the Home_controller file module
const homeController = require("../controllers/home_controller");
console.log("File is connected");

// We are using the home function here
router.get("/", homeController.home);
module.exports = router;
