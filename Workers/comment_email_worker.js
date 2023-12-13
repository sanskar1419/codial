const queue = require("../config/kue");

const commentsMailer = require("../mailers/comment_mailer");

queue.process("comment_email", function (job, done) {
  console.log("email worker is processing the job", job.data);

  commentsMailer.newComment(job.data);
});
