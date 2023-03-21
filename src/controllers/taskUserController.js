
const uuid = require("uuid");
const { createNewUserTaskUser } = require("../services/taskUser");



const createTaskUserController=async (req,res)=>{
    try {
        const { proirity, taskID,users } = req.body;
        const id = uuid.v4();
        let obj = {id ,proirity, taskID,users};
        const newTaskUser = await createNewUserTaskUser(obj);
        res.status(201).json(newTaskUser);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
      }
}
const getTaskUserController=(req,res)=>{
const taskUsers=await 
}
module.exports={createTaskUserController,getTaskUserController}