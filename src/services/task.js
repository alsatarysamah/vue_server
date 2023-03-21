const { Op } = require("sequelize");
const sequelize = require("../../models");
const { wherINJSON } = require("../helper/qurey");
const { whereINDataType } = require("../helper/qurey");
const { getUserTaskById } = require("./taskUser");

const createNewTask = async (task) => {
  return await sequelize.models.Tasks.create(task);
};

const getTask = async (id, proirity, duty, creator, offsetObject, arrUsers) => {
  try {
    let tasks = await sequelize.models.Tasks.findAndCountAll({
      where: {
        [Op.and]: [
          proirity ? wherINJSON("proirity", "eq", "rank", proirity) : {},
          duty ? whereINDataType("duty", "like", `%${duty}%`) : "",
          creator ? whereINDataType("creator", "like", `%${creator}%`) : "",
          id ? whereINDataType("id", "eq", `${id}`) : "",
          arrUsers ? whereINDataType("id", "in", arrUsers): "",
        //  whereINDataType("recordStatus", "eq", "LATEST"),
        ],
      },
      ...offsetObject,
    });
    
   
  
    return tasks;
  } catch (error) {
    // throw error
    console.log(error);
  }
};
const filtring=()=>{

}
const updateTask = async (id) => {
  return await sequelize.models.Tasks.update();
};
const updateTaskRecordStatus = async (newStatus, id) => {
  try {
    return await sequelize.models.Tasks.update(
      {
        recordStatus: newStatus,
      },
      {
        where: {
          id: id,
          recordStatus: "LATEST",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
module.exports = { createNewTask, getTask, updateTaskRecordStatus };
