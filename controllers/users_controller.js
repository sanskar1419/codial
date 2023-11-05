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
module.exports.create = function (req, res) {
  //todo later
};

module.exports.createSession = function (req, res) {
  //todo later
};
