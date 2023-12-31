const nodemailer = require("../config/nodemailer");

// Lets try a new way exporting
// Instead newComment = function();
// module.export = newcomment;

exports.newComment = (comment) => {
  // console.log("Inside new comment mailer", comment);
  //   console.log(nodemailer.transporter);
  let htmlContent = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment_template.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "testingcoding5@gmail.com",
      to: comment.user.email,
      subject: "New comment punlished",
      html: htmlContent,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message Sent", info);
      return;
    }
  );
};
