const followModel = require("../models/follow.model");

async function sendFollowRequest(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.id;

  // 1. Prevent self follow
  if (followerId === followeeId) {
    return res.status(401).json({
      message: "You cannot follow yourself",
    });
  }

  // 2. Check is-already following
  const isFollowing = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (isFollowing) {
    if (isFollowing.status === "pending") {
      return res.status(400).json({
        message: "Follow request already sent",
      });
    }

    if (isFollowing.status === "accepted") {
      return res.status(400).json({
        message: "Already following user",
      });
    }

    if (isFollowing.status === "rejected") {
      isFollowing.status === "pending";
      await isFollowing.save();

      return res.status(201).json({
        message: "Follow request sent",
        follow: isFollowing,
      });
    }
  }

  // 3. Send follow request
  const follow = await followModel.create({
    follower: followerId,
    followee: followeeId,
    status: "pending",
  });

  res.status(201).json({
    message: "Follow request sent",
    follow,
  });
}

async function acceptFollowRequest(req, res) {
  const userId = req.user.id;
  const followId = req.params.followId;

  const followReq = await followModel.findById(followId);

  if (!followReq) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  if (followReq.followee.toString() !== userId) {
    return res.status(403).json({
      message: "Not Authorized",
    });
  }

  if (followReq.status === "pending") {
    followReq.status = "accepted";
    await followReq.save();

    return res.status(201).json({
      message: "Request accepted successfully",
      followReq,
    });
  }

  return res.status(400).json({
    message: "Request cannot be accepted",
  });
}

async function getAllFollowRequests(req, res) {
  const userId = req.user.id;

  const getFollowing = await followModel.find({
    followee: userId,
    status: "pending",
  });

  if (getFollowing.length === 0) {
    return res.status(200).json({
      message: "No follow requests pending",
    });
  }

  res.status(200).json({
    message: "All requests fetched successfully",
    getFollowing,
  });
}

async function rejectFollowRequest(req, res) {
  const userId = req.user.id;
  const followId = req.params.followId;

  const followReq = await followModel.findById(followId);

  if (!followReq) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  if (followReq.followee.toString() !== userId) {
    return res.status(403).json({
      message: "Not Authorized",
    });
  }

  if (followReq.status === "pending") {
    followReq.status = "rejected";
    await followReq.save();

    return res.status(201).json({
      message: "Follow Request Rejected",
      followReq,
    });
  }

  return res.status(400).json({
    message: "Cannot be rejected",
  });
}

async function unfollowUser(req, res) {
  const userId = req.user.id;
  const followId = req.params.followId;

  const getFollow = await followModel.findById(followId);

  if (!getFollow) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  const isFollower = getFollow.follower.toString() === userId;
  const isFollowee = getFollow.followee.toString() === userId;

  if (!isFollower && !isFollowee) {
    return res.status(403).json({
      message: "Not Authorized",
    });
  }

  await getFollow.deleteOne();

  return res.status(200).json({
    message: "Unfollowed User",
  });
}

module.exports = {
  sendFollowRequest,
  acceptFollowRequest,
  getAllFollowRequests,
  rejectFollowRequest,
  unfollowUser,
};
