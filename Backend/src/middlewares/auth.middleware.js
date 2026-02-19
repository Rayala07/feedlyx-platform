const jwt = require("jsonwebtoken");
require("dotenv").config();

function identifyUser(req, res, next) {
  // Request token from cookies.
  const token = req.cookies.token;

  // Validate token, if not present, return 401.
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // Verify token. If invalid, return 401.
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = decoded;

  next();
}

module.exports = identifyUser;
