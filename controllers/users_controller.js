const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("users", {
    title: "Users Home",
  });
};

// module.exports.post = function (req, res) {
//   res.end("<h1>Users Post</h1>");
// };

//render sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codial | Sign In",
  });
};

// render sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codial | Sign Up",
  });
};

// get sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      try {
        const newUser = await User.create(req.body);
        return res.redirect("/users/sign-in");
      } catch (err) {
        console.log("Error in creating the user in signing up ", err);
        return;
      }
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in finding the user in signing up ", err);
    return;
  }
};

// sign in and start user session
module.exports.createSession = async function (req, res) {
  // Step to authentication
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email });
    // hander user found
    if (user) {
      //Handle password doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // Handle Session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      //Handle user not found
      return res.redirect("back");
    }
  } catch (err) {
    // Error in finding user
    console.log("Error in finding the user in signing In ", err);
    return;
  }
};
