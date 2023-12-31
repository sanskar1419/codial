// Requiring Mongoose
const mongoose = require("mongoose");

// Creating Schema for Storing Post
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      // Refering to the User Schema already present in the MongoDb
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Include the id of all the comment made on this post
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // Storing all the post like so that it is easily to accsess
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    // Automatically Update Two field created at and updated at
    timestamps: true,
  }
);

// Telling that its a Model
const Post = mongoose.model("Post", postSchema);
// Exporting It
module.exports = Post;
