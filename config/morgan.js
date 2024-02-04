const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

// Now we will define where the logs will be saving
const logDirectory = path.join(__dirname, "../production_logs");
// I need to find is it all ready exist or I need to create it
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});
// const development = {
//   name: "development",
//   asset_path: "./assets",
//   session_cookie_key: "gvghccgcfgcgw",
//   db: "codial_development",
//   smtp: {
//     service: "gmail",
//     host: "smtp.gmail.com", //domain name used for smtm service
//     port: 587,
//     secure: false, //no need of two step verification
//     auth: {
//       user: "testingcoding5@gmail.com",
//       pass: "egpaxmoregincdzz", //App password
//     },
//   },
//   google_client_id:
//     "108734989334-399d9s7ks0cifmgfuprvsretp6shas24.apps.googleusercontent.com",
//   google_client_Secret: "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",
//   google_callback_URL: "http://localhost:9000/users/auth/google/callback",
//   jwt_key: "Codial",
//   morgan: {
//     node: "dev",
//     options: { stream: accessLogStream },
//   },
// };

// // console.log(process.env);
// const production = {
//   name: "production",
//   asset_path: "./public/assets",
//   session_cookie_key: "ghgdghsvaghvghdascwghghcd",
//   db: "codial_production",
//   smtp: {
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "testingcoding5@gmail.com",
//       pass: "egpaxmoregincdzz",
//     },
//   },
//   google_client_id:
//     "108734989334-399d9s7ks0cifmgfuprvsretp6shas24.apps.googleusercontent.com",
//   google_client_Secret: "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",
//   google_callback_URL: "http://codial.com/users/auth/google/callback",
//   jwt_key: "Codial",
//   morgan: {
//     node: "combined",
//     options: { stream: accessLogStream },
//   },
// };

// // console.log(eval(process.env.NODE_ENV));
// module.exports =
//   eval(process.env.NODE_ENV) == development ? development : eval(production);

module.exports.accessLogStream;
