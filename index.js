const express = require("express");
const cookieParsser = require("cookie-parser");
const app = express();
const port = 9000;
//Aquire express-ejs-layout
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategies");
const MongoStore = require("connect-mongo");

// de encoding the data from POST request
app.use(express.urlencoded());
// tell the app to use cookie parser
app.use(cookieParsser());

// use assets folder for styling
app.use(express.static("./assets"));

// Use express ejs layout
app.use(expressLayout);

// Extract styles and script from sub-pages to layout page
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting view engin as ejs
app.set("view engine", "ejs");
// setting the view folder path
app.set("views", "./views");

app.use(
  session({
    name: "codial",
    //change the secret before deployment in production mode
    secret: "gvghccgcfgcgw",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

// We will make the application listen to server
app.listen(port, function (err) {
  // In printing we have used back tick and interpolation in order to print
  if (err) {
    console.log(`Error in running the Server : ${err}`);
  }
  console.log(`Server is running in port : ${port}`);
});
