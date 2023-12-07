module.exports.index = function (req, res) {
  //index name is used when we want to list down something
  return res.json(200, {
    //This is the way to send the json data as response
    message: "List of post",
    posts: [],
  });
};
