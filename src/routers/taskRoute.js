const express = require("express");
const { updateTaskController } = require("../controllers/taskController");
const { getFullDetails } = require("../controllers/taskController");
const { createSubTask } = require("../controllers/taskController");
const { deleteTaskController } = require("../controllers/taskController");
const { getTasksController } = require("../controllers/taskController");
const { createTaskController } = require("../controllers/taskController");


const taskRoute = express.Router();



taskRoute.post("/gettask", getTasksController);
taskRoute.post("/createtask", createTaskController);
taskRoute.post("/deletetask", deleteTaskController);
taskRoute.post("/updatetask", updateTaskController);
taskRoute.post("/createsub", createSubTask);
taskRoute.post("/full", getFullDetails);




//foundallandcou

module.exports = taskRoute;
