const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // To print and manipulate the key value pair data present in the cookie
  // console.log(req.cookies);
  // res.cookie("user_id", 35);
  try {
    const posts = await Post.find({})
      .populate("user") //This will find which user has created the post
      .populate({
        path: "comments", //This will find all the comments on that post
        populate: {
          path: "user", //this will find the user commented on the post
        },
      });
    try {
      const users = await User.find({});
      return res.render("home", {
        title: "Codial Home",
        posts: posts,
        all_users: users,
      });
    } catch (err) {
      console.log("Error in finding user : ", err);
    }
  } catch (err) {
    console.log("Unable to find post ", err);
    return;
  }

  // return res.end("<h1>Express is up for Codial</h1>");
};

// module.exports.contact = function (req, res) {
//   return res.end("<h1>Show contact</h1>");
// };
