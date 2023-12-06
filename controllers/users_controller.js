const User = require("../models/user");
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("users", {
      title: "Users Home",
      profile_user: user,
    });
  } catch (err) {
    req.flash("error", err);
    console.log("Error !!!!!!!!!!!!!!!!!! ", err);
    return;
  }
};

// Controller action for updating user profile
module.exports.update = async function (req, res) {
  try {
    // console.log(req.user.id);
    // console.log(req.params.id);
    if (req.user.id == req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id);
      // Here one thing we need to note that we cannot accsess the body params directly since while creating form we have define enctype as multipart/form-data. So we need to accsess it differently. So for that multer static function uploadAvatar will be used because it take req as an argument also.
      User.uploadAvatar(req, res, function (err) {
        if (err) {
          req.flash(
            "error",
            "Unable to update the profile !!!!!!!!!!!!!!!!!!!"
          );
          console.log("*******************Multer Error ****************", err);
        }
        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          // it is just saving the path of the uploaded file into the user schema avatar
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "Details Updated Succesfully !!!!!!!!!!!");
        return res.redirect("back");
      });
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error !!!!!!!!!!!!!!!!!! ", err);
    return res.status(401).send("unauthoried");
  }
};

// module.exports.post = function (req, res) {
//   res.end("<h1>Users Post</h1>");
// };

//render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codial | Sign In",
  });
};

// render sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codial | Sign Up",
  });
};

// get sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Error! Confirm Password and Passwors doesn't match");
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newUser = await User.create(req.body);
      req.flash("success", "Signed Up Successfully. Now you can Sign In");
      return res.redirect("/users/sign-in");
    } else {
      req.flash(
        "info",
        "Email Already exist, Try to signed in or use other email"
      );
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error !!!!!!!!!!!!!!!!!! ", err);
    return;
  }
};

// sign in and start user session
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully !!");
  return res.redirect("/");
};

module.exports.distroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error in logout");
      return;
    }
    req.flash("success", "You have Logged out");
    return res.redirect("/");
  });
};
