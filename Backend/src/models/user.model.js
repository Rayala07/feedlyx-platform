const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/htg6mf2k3/defaultimage.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
