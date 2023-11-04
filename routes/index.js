const express = require("express");
const router = express.Router();

// Aquiring the Home_controller file module
const homeController = require("../controllers/home_controller");
console.log("File is connected");

// We are using the home function here
router.get("/", homeController.home);
// router.use("/contact", homeController.contact);

// Request comes from /users should be forwarded to user.js
router.use("/users", require("./users"));

// For any other router the syntex will be
// router.use("/routerName",require("./routerName"))
module.exports = router;
