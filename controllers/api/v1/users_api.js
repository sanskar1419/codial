const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/morgan");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    } else {
      return res.json(200, {
        message: "Sign in successful. here is your token, please keep it safe",
        data: {
          token: jwt.sign(user.toJSON(), env.jwt_key, { expiresIn: "100000" }),
        },
      });
    }
  } catch (err) {
    console.log("*****************Error**************************", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
