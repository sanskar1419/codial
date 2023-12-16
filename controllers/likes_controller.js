// Require all the model that are require
const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;
    // likes/toggle/?id=abcdef&type=Post
    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // Now we check for likes already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    console.log(existingLike);
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.deleteOne();
      deleted = true;
    } else {
      let newLike = await Like.create({
        likeable: req.query.id,
        onModel: req.query.type,
        user: req.user._id,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.json(200, {
      message: "Request Successful",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internnal Server Error",
    });
  }
};
