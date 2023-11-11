// Importing Post Schema
const Post = require("../models/post");

// Function for creating new Post
module.exports.createPost = async function (req, res) {
  try {
    // console.log(req.body);
    const newPost = await Post.create({
      content: req.body.content,
      // for saving user
      user: req.user._id,
    });
    console.log(newPost);
    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating the post!!!!");
    return;
  }
};
