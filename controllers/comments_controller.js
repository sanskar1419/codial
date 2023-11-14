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

// Controller action for deleting an particular comment made by that user.
module.exports.deleteComment = async function (req, res) {
  try {
    // console.log(req.params.id);
    const selectedComment = await Comment.findById(req.params.id);
    // console.log(selectedComment);
    // console.log(selectedComment.user.toString());
    // console.log(req.user.id);
    if (selectedComment.user.toString() === req.user.id) {
      // console.log(selectedComment.post);
      let postId = selectedComment.post;
      // console.log(selectedComment);
      await selectedComment.deleteOne();
      try {
        await Post.findByIdAndUpdate(postId, {
          $pull: { comments: req.params.id },
        });
        return res.redirect("back");
      } catch (err) {
        console.log("Enable to delete comment Id from that post : ", err);
        return;
      }
    }
  } catch (err) {
    console.log("Comment doesn't exist", err);
    return;
  }
};
