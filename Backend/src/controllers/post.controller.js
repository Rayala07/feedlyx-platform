const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  // File upload to imagekit
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "image1",
    folder: "feedlyx-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    img_url: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created",
    post,
  });
}

module.exports = {
  createPostController,
};
