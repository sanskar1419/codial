const Post = require("../models/post");
module.exports.createPost = async function (req, res) {
  try {
    // console.log(req.body);
    const newPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    console.log(newPost);
    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating the post!!!!");
    return;
  }
};
