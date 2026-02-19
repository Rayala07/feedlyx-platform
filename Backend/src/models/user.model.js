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
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/htg6mf2k3/defaultimage.jpg",
  },
  // Not possible to store followers and following as array of ObjectIds because of the limit of 100 items in an array in mongoose, so we will create a separate collection for followers and following, this concept is called as "Edge-collection".
  // followers: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //   },
  // ],
  // following: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //   },
  // ],
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
