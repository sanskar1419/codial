const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  //Header have a list and out of this list we have a key authentication and it also have a list key value pair and one of them is Bearer
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Codial",
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in finding out the user ", err);
      return;
    }
  })
);

module.exports = passport;
