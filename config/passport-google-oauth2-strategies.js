const passport = require("passport");
const User = require("../models/user");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
require("../env.js");

// Defining that we are going to use google oauth2
passport.use(
  new googleStrategy(
    {
      //Todo give client id and secret here.*********************************************
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          let newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.log("Error in passport google strategy", error);
        return;
      }
    }
  )
);

module.exports = passport;
