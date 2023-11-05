module.exports.home = function (req, res) {
  // To print and manipulate the key value pair data present in the cookie
  // console.log(req.cookies);
  // res.cookie("user_id", 35);

  return res.render("home", {
    title: "Codial Home",
  });
  // return res.end("<h1>Express is up for Codial</h1>");
};

// module.exports.contact = function (req, res) {
//   return res.end("<h1>Show contact</h1>");
// };
