const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/request/:id",
  identifyUser,
  userController.sendFollowRequest,
);

userRouter.patch(
  "/follow/accept/:followId",
  identifyUser,
  userController.acceptFollowRequest,
);

userRouter.get(
  "/follow/requests/incoming",
  identifyUser,
  userController.getAllFollowRequests,
);

userRouter.patch(
  "/follow/reject/:followId",
  identifyUser,
  userController.rejectFollowRequest,
);

userRouter.delete(
  "/unfollow/:followId",
  identifyUser,
  userController.unfollowUser,
);

module.exports = userRouter;
