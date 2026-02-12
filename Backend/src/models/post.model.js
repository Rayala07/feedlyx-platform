const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    defaut: "",
  },
  imgUrl: {
    type: String,
    required: [true, "Please upload some image"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user_id required"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
