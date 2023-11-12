const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentController = require("../controllers/comments_controller");

router.post(
  "/create-comment",
  passport.checkAuthentication,
  commentController.createComments
);

module.exports = router;
