const express = require("express");
const app = express();
const port = 9000;

//Aquire express-ejs-layout
const expressLayout = require("express-ejs-layouts");
// Use express ejs layout
app.use(expressLayout);

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
