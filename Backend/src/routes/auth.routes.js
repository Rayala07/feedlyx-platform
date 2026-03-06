const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

// User registration
authRouter.post("/register", authController.registerController);

// User Login
authRouter.post("/login", authController.loginController);

// GetUser Details
authRouter.get("/get-me", identifyUser, authController.getUserDetails);

// Logout User
authRouter.post("/logout", authController.logoutController);

module.exports = authRouter;
