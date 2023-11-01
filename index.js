const express = require("express");
const app = express();
const port = 9000;

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
