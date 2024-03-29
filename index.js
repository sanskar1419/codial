require("./env");
console.log(process.env.ASSET_PATH);
const express = require("express");
const env = require("./config/morgan");
const logger = require("morgan");
const cookieParsser = require("cookie-parser");
const app = express();
const port = 9000;
//Aquire express-ejs-layout
const accessLogStream = require("./config/morgan.js");
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategies");
const passportJWT = require("./config/passport-jwt-strategies");

const passportGoogle = require("./config/passport-google-oauth2-strategies");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
// used for flash messeging
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// setup the chat server to be used with socket.io
const http = require("http");
const chatServer = http.Server(app);
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000, () => {
  console.log("chat server is listening on port 5000");
});
const path = require("path");

if (process.env.NODE_ENV == "development") {
  // We need to put up some setting to use saas middleware
  //we need to put them just before the start of server so that it can be precompiled and whenever browser ask for it can give it the precompiled file.
  app.use(
    sassMiddleware({
      //Where do I pickup the file for scss to convert it to css
      src: path.join(__dirname, process.env.ASSET_PATH, "scss"),
      // Where I want to put my css files
      dest: path.join(__dirname, process.env.ASSET_PATH, "css"),
      // To display some error in debug mode if it not able to compile it we use debug
      debug: true,
      //If I wanted it to be in multiple line or single line
      outputStyle: "expanded",
      //Now I need to tell where i need to lookout for css file. previously it was css folder
      prefix: "/css",
    })
  );
}
// console.log(env.name);
// de encoding the data from POST request
app.use(express.urlencoded());
// tell the app to use cookie parser
app.use(cookieParsser());

// use assets folder for styling
app.use(express.static(process.env.ASSET_PATH));
app.use(express.static("assets"));

// Here we are joining the codial forlder path with uploads and telling to use this of finding the destination folder
app.use("/uploads", express.static(__dirname + "/uploads"));

// app.use(logger(process.env.MORGAN_NODE, { stream: accessLogStream }));

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
    name: process.env.JWT_KEY,
    //change the secret before deployment in production mode
    secret: process.env.SESSION_COOKIE,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: `mongodb://localhost/${process.env.DB}`,
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

// use connect flash
app.use(flash());
app.use(customMware.setFlash);
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
