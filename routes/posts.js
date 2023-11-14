const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controllers/post_controller");

router.post(
  "/create-post",
  passport.checkAuthentication,
  postController.createPost
);
//Routing to delete post controller action and simultaneusly check for authorization for the user to delete the post
router.get(
  "/delete-post/:id",
  passport.checkAuthentication,
  postController.deletePost
);
module.exports = router;
