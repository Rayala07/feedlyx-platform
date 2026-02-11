const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registration Controller
async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email == email
          ? "Email already exists"
          : "Username already exists",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

// Login Controller
async function loginController(req, res) {
  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUser) {
    return res.status(404).json({
      message: "Sorry, user not found",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const isPasswordValid = hash === isUser.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: isUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login Successful",
    user: {
      username: isUser.username,
      email: isUser.email,
      bio: isUser.bio,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
