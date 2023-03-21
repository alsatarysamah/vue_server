const { sequelize } = require("../../models");
const { Op } = require("sequelize");
const uuid = require("uuid");

const createSub=async(id,sub)=>{
    let obj = {};

    for (let index = 0; index < sub.length; index++) {
      obj.id = uuid.v4();
      obj.sub = sub[index];
      obj.taskID = id;
     
      await sequelize.models.SubTask.create(obj);
    }
}


const getSubTask=async (taskId)=>{
    const sub = await sequelize.models.SubTask.findAll({
        where: { taskID: taskId },
      });
    
      return sub.map((element) => element.sub);
}
module.exports={createSub,getSubTask}