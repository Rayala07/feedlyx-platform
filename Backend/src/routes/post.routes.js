const express = require("express");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post(
  "/create",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

postRouter.get("/", identifyUser, postController.getPostController);

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

postRouter.get("/feed", identifyUser, postController.postFeedController);

module.exports = postRouter;
