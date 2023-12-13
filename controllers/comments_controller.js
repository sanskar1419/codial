const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailers = require("../mailers/comment_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../Workers/comment_email_worker");

module.exports.createComments = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      let newComment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(newComment);
      post.save();
      newComment = await newComment.populate("user", "name email");
      // commentMailers.newComment(newComment);
      let job = queue.create("comment_email", newComment).save(function (err) {
        if (err) {
          console.log("Error in sending the queue", err);
          return;
        }
        console.log("job enqueued ", job.id);
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: newComment,
            user_name: req.user.name,
          },
          message: "Comment added Successfully",
        });
      }
      req.flash("success", "Comment added Successfully");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error !!!!!!!!!!!!!!!!!!! ", err);
    return;
  }
};

// Controller action for deleting an particular comment made by that user.
module.exports.deleteComment = async function (req, res) {
  try {
    console.log(req.params.id);
    const selectedComment = await Comment.findById(req.params.id);
    // console.log(selectedComment);
    // console.log(selectedComment.user.toString());
    // console.log(req.user.id);
    if (selectedComment.user == req.user.id) {
      // console.log(selectedComment.post);
      let postId = selectedComment.post;
      // console.log(selectedComment);
      await selectedComment.deleteOne();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      // send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment deleted",
        });
      }

      req.flash("success", "Comment deleted successfully");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error !!!!!!!!!!!!!!!!!!!!!!!", err);
    return;
  }
};
