const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

// User registration
authRouter.post("/register", authController.registerController);

// User Login
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
