const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");
//Forward to users profile controller
router.get("/profile", usersController.profile);
// router.get("/posts", usersController.post);
module.exports = router;
