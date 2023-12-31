const mongoose = require("mongoose");

// Using multer for the file upload
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const maxSize = 2 * 1024 * 1024; //Max size for the file to upload
// Static Function
// Here we are linking  avatar to the storage path. Here single is specifing that the user can select only one file at a time.To make it available.
userSchema.statics.uploadAvatar = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.flash("error", "Only .png .jpg and .jpeg format allowed !");
      return cb(new Error("Only .png .jpg and .jpeg format allowed !"));
    }
  },
  limits: {
    fieldSize: maxSize,
  },
}).single("avatar");
// Now we will want that avatar path to be available publically.
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);
module.exports = User;
