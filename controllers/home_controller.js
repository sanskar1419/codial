const Post = require("../models/post");
module.exports.home = async function (req, res) {
  // To print and manipulate the key value pair data present in the cookie
  // console.log(req.cookies);
  // res.cookie("user_id", 35);
  try {
    const posts = await Post.find({}).populate("user");
    return res.render("home", {
      title: "Codial Home",
      posts: posts,
    });
  } catch (err) {
    console.log("Unable to find post ", err);
    return;
  }

  // return res.end("<h1>Express is up for Codial</h1>");
};

// module.exports.contact = function (req, res) {
//   return res.end("<h1>Show contact</h1>");
// };
