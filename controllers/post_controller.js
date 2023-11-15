// Importing Post Schema
const Post = require("../models/post");
const Comment = require("../models/comment");

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
    console.log("Error !!!!!!!!!!!!!!!!!!!!", err);
    return;
  }
};

// Controller action for deleteting the post.
module.exports.deletePost = async function (req, res) {
  try {
    // console.log(req.params.id);
    // First we will find weather the post exsist of note.
    const post = await Post.findById(req.params.id);
    // console.log(post);
    // console.log(post.user.toString());
    // console.log(req.user.id);
    // Now we will check weather the user who has requested the post to be deleted is same as the post user.
    if (post.user.toString() === req.user.id) {
      // console.log("hello");
      // Since delete is deprecated I have used deleteOne for that.
      await post.deleteOne();
      // After deleting the post we also need to delete comment under it So we will use deleteMany
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error !!!!!!!!!!!", err);
    return;
  }
};
