const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  //index name is used when we want to list down something

  //   First we will find all the post from the db
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user") //This will find which user has created the post
    .populate({
      path: "comments", //This will find all the comments on that post
      populate: {
        path: "user", //this will find the user commented on the post
      },
    });

  //   posts.user.password = undefined;
  return res.json(200, {
    //This is the way to send the json data as response
    message: "List of post",
    posts: posts,
  });
};

module.exports.deletePost = async function (req, res) {
  try {
    // First we will find weather the post exsist of note.
    const post = await Post.findById(req.params.id);
    // Now we will check weather the user who has requested the post to be deleted is same as the post user.
    // if (post.user.toString() === req.user.id) {
    // Since delete is deprecated I have used deleteOne for that.
    await post.deleteOne();
    // After deleting the post we also need to delete comment under it So we will use deleteMany
    await Comment.deleteMany({ post: req.params.id });

    return res.json(200, {
      message: "Successfully able to delete the post",
    });
  } catch (err) {
    console.log("Error !!!!!!!!!!!", err);
    return res.json(200, {
      message: "Something went wrong",
    });
  }
};
