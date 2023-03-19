const express = require("express");
const {
  getUsersController,
  createUserController,
} = require("../controllers/usersController");

const userRoute = express.Router();



userRoute.get("/getuser", getUsersController);

userRoute.post("/createuser", createUserController);
//foundallandcou

module.exports = userRoute;
