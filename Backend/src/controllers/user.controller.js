const followModel = require("../models/follow.model");

async function followUserController(req, res) {
  const id = req.user.id;
  const followeeId = req.params.id;

  if (id === followeeId) {
    return res.status(401).json({
      message: "You cannot follow yourself",
    });
  }

  const follow = await followModel.create({
    follower: id,
    followee: followeeId,
  });

  res.status(201).json({
    message: "User followed successfully",
    follow,
  });
}

async function unfollowUserController(req, res) {
  const id = req.user.id;
  const followeeId = req.params.id;

  if (id === followeeId) {
    return res.status(401).json({
      message: "You cannot unfollow yourself",
    });
  }

  const isFollowing = await followModel.findOne({
    follower: id,
    followee: followeeId,
  });

  if (!isFollowing) {
    return res.status(404).json({
      message: "You are not following this user",
    });
  }

  await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: "User unfollowed successfully",
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
};
