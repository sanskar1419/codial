const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComments = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      try {
        const newComment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
        post.comments.push(newComment);
        post.save();
        return res.redirect("/");
      } catch (err) {
        console.log("Error in creating the post !!!!!!!", err);
        return;
      }
    }
  } catch (err) {
    console.log("Post does not exist !!!!!!!!!! ", err);
    return;
  }
};
