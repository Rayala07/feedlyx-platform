const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
require("dotenv").config();

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  // File upload to imagekit
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "image1",
    folder: "feedlyx-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    img_url: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Fetch success",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const getPost = await postModel.findById(postId);

  if (!getPost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  if (userId !== getPost.user.toString()) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  res.status(200).json({
    message: "Post Fetch Success",
    getPost,
  });
}

async function likePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: userId,
  });

  res.status(201).json({
    message: "Post liked successfully",
    like,
  });
}

async function unlikePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const removeLike = await likeModel.findOneAndDelete({
    post: postId,
    user: userId,
  });

  if (!removeLike) {
    res.status(400).json({
      message: "Like Does not exist",
    });
  }

  res.status(201).json({
    message: "Post unliked",
  });
}

async function postFeedController(req, res) {
  const user = req.user.id;

  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);

      return post;
    }),
  );

  if (!posts) {
    return res.status(404).json({
      message: "Posts not found",
    });
  }

  return res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  postFeedController,
};
