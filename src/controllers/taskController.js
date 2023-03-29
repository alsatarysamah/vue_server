const uuid = require("uuid");
const { getSubTask } = require("../services/sub");
const { createSub } = require("../services/sub");
const { updateTaskRecordStatus } = require("../services/task");
const { getTask } = require("../services/task");
const { createNewTask } = require("../services/task");
const { getUserTaskById } = require("../services/taskUser");
const { getUserTaskUser } = require("../services/taskUser");
const { updateUserTaskRecordTaskStatus } = require("../services/taskUser");
const { createNewUserTaskUser } = require("../services/taskUser");

const createTaskController = async (req, res) => {
  try {
    const { creator, duty, users, proirity, sub } = req.body;
    const id = uuid.v4();
    let obj = { id, creator, duty, proirity };
    const newTask = await createNewTask(obj);
    users ? await createNewUserTaskUser(id, users) : "";
    sub ? await createSub(id, sub) : "";
    res.status(201).json({ ...newTask.dataValues, users: users, sub: sub });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
const getTasksController = async (req, res) => {
  try {
    const { id, limit, offset, proirity, duty, creator, user } = req.body;

    const offsetObject = null;
   
    if (offset && limit) {
      offsetObject.limit = limit;
      offsetObject.offset = (offset - 1) * limit;
    }
    let arrUsers;
    if (user) arrUsers = await getUserTaskById(user);

  

    let tasks = await getTask(
      id,
      proirity,
      duty,
      creator,
      user,
      offsetObject,
      arrUsers
    );

    if (!user) tasks = await getTaskUser(tasks.rows);
    // else result = await getMpping(tasks);
    res.status(200).send(tasks);
    return tasks;
  } catch (error) {
    console.log(error);
  }
};
const getMpping = async (tasks) => {
  let res = [];
  for (let index = 0; index < tasks.length; index++) {
    let element = tasks[index];
    let task = await getTask(element);
    res.push(task.rows);
  }
  return res;
};
async function getTaskUser(tasks) {
  
  let users = [];
  let res = [];

  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    users = await getUserTaskUser(element.id);
    let obj = { ...element.dataValues, users: users };
    res.push(obj);
  }
  return res;
}

const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await getTask(id);
   
    const update = await updateTaskRecordStatus("deleted", id);

    await updateUserTaskRecordTaskStatus(id, "DELETED");
    const deletedtask = await getTask(id);

    res.status(200).send(deletedtask);
  } catch (error) {
    console.log(error);
  }
};

const createSubTask = async (req, res) => {
  try {
    const { sub, creator, proirity, duty } = req.body;

    const id = uuid.v4();
    let obj = { id, creator, duty, proirity };
    const newOne = await createNewTask(obj);
    const newTask = await createSub(id, sub);

    res.status(201).json({ ...newOne.dataValues, sub: sub });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const getFullDetails = async (req, res) => {
  try {
    const { id } = req.body;
    let tasks = await getTask(id);
    let users = [];
    for (let index = 0; index < tasks.rows.length; index++) {
      const element = tasks.rows[index];
     
      users = await getUserTaskUser(element.id);
    }
    let sub = [];
    for (let index = 0; index < tasks.rows.length; index++) {
      const element = tasks.rows[index];
      
      sub = await getSubTask(element.id);
    }
  
    res
      .status(200)
      .send({ ...tasks.rows[0].dataValues, users: users, sub: sub });
  } catch (error) {
    console.log(error);
  }
};

const updateTaskController = async (req, res) => {
  try {
    let { creator, proirity, duty, id } = req.body;
    let oldTask = await getTask(id);
    oldTask = oldTask.rows[0].dataValues;
    await updateTaskRecordStatus("UPDATED", id);
    const taskDTO = {
      id,
      duty: duty ? duty : oldTask.duty,
      proirity: proirity ? proirity : oldTask.proirity,
      creator: creator ? creator : oldTask.creator,
    };
  

    const updatedTask = await createNewTask(taskDTO);
    res.status(200).send(updatedTask);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTaskController,
  getTasksController,
  deleteTaskController,
  updateTaskController,
  createSubTask,
  getFullDetails,
};
