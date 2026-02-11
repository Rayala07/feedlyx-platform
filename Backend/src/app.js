const express = require("express");
const userModel = require("./models/user.model");

const app = express();
app.use(express.json());



module.exports = app;
