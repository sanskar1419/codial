const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentController = require("../controllers/comments_controller");

router.post(
  "/create-comment",
  passport.checkAuthentication,
  commentController.createComments
);

router.get(
  "/delete-comment/:id",
  passport.checkAuthentication,
  commentController.deleteComment
);
module.exports = router;
