const express = require("express");
const cookieParsser = require("cookie-parser");
const app = express();
const port = 9000;
//Aquire express-ejs-layout
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");

// use assets folder for styling
app.use(express.static("./assets"));

// Use express ejs layout
app.use(expressLayout);

// Extract styles and script from sub-pages to layout page
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.use("/", require("./routes"));

// setting view engin as ejs
app.set("view engine", "ejs");
// setting the view folder path
app.set("views", "./views");

// We will make the application listen to server
app.listen(port, function (err) {
  // In printing we have used back tick and interpolation in order to print
  if (err) {
    console.log(`Error in running the Server : ${err}`);
  }
  console.log(`Server is running in port : ${port}`);
});
