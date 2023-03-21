const express = require("express");
const { getTaskUserController } = require("../controllers/taskUserController");
const { createTaskUserController } = require("../controllers/taskUserController");


const taskUserRoute = express.Router();



taskUserRoute.get("/gettaskuser", getTaskUserController);

taskUserRoute.post("/createtaskuser", createTaskUserController);
//foundallandcou

module.exports = taskUserRoute;
