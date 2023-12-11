// Require neccesary library and schema

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Defining transporter. Transporter will be an object and we will attach it to node mailer. This is the part which define how the communication will take place

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", //domain name used for smtm service
  port: 587,
  secure: false, //no need of two step verification
  auth: {
    user: "testingcoding5@gmail.com",
    pass: "Coding@123",
  },
});

// We need define that we will be using ejs as template engine
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in randering the tamplate", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
