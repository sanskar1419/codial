module.exports.profile = function (req, res) {
  return res.render("users", {
    title: "Users Home",
  });
};

// module.exports.post = function (req, res) {
//   res.end("<h1>Users Post</h1>");
// };
