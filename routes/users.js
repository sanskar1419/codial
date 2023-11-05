const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");
//Forward to users profile controller
router.get("/profile", usersController.profile);
router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);
module.exports = router;
