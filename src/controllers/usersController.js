const { getUsers } = require("../services/user");
const { createNewUser } = require("../services/user");
const uuid = require("uuid");

const getUsersController =async(req,res)=>{
    const {limit,offset}=req.body;
console.log(limit,offset);
const users = await getUsers(limit,offset);
res.status(200).send(users)
}


const createUserController = async (req, res) => {
  try {
    const { userName, age } = req.body;
    const id = uuid.v4();
    let obj = { id, userName, age };
    const newUser = await createNewUser(obj);
    res.status(201).json(obj);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports={getUsersController,createUserController}