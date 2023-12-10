const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");
//Forward to users profile controller
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);
router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.post("/create", usersController.create);
// use passport as middleware to attenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
router.get("/sign-out", usersController.distroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
module.exports = router;
