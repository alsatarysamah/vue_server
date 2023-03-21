const { Op } = require("sequelize");
const sequelize = require("../../models");
const uuid = require("uuid");
const { whereINDataType } = require("../helper/qurey");
const { wherINJSON } = require("../helper/qurey");

const createNewUserTaskUser = async (id, users) => {
  let obj = {};

  for (let index = 0; index < users.length; index++) {
    obj.id = uuid.v4();
    obj.users = users[index];
    obj.taskID = id;
    console.log(obj);
    await sequelize.models.TaskUser.create(obj);
  }
};
const getUserTaskById = async (userId, taskId) => {
  const taskUsers = await sequelize.models.TaskUser.findAll({
    where: {
      [Op.and]: [
        taskId ? whereINDataType("taskID", "eq", `${taskId}`) : "",
        userId ? wherINJSON("users", "eq", "id", `${userId}`) : "",
      ],
    },
  });

  return taskUsers.map((element) => element.taskID);
};
const getUserTaskUser = async (taskId) => {
  const users = await sequelize.models.TaskUser.findAll({
    where: { taskID: taskId },
  });

  return users.map((element) => element.users);
};
const updateUserTaskRecordTaskStatus = async (
  taskId,

  recordStatus
) => {
  try {
    return await sequelize.models.TaskUser.update(
      {
        recordStatus: recordStatus,
      },
      {
        where: { taskID: taskId, recordStatus: "LATEST" },
      }
    );
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewUserTaskUser,
  getUserTaskById,
  updateUserTaskRecordTaskStatus,
  getUserTaskUser,
};
