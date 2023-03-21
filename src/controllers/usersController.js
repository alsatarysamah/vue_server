const { getUsers } = require("../services/user");
const { createNewUser } = require("../services/user");
const uuid = require("uuid");

const getUsersController = async (req, res) => {
  try {
    
  
  const { limit, offset, age, dateTo,dateFrom } = req.body;

  const offsetObject = null;

  if (offset && limit) {
    offsetObject.limit = limit;
    offsetObject.offset = (offset - 1) * limit;
  }


  const users = await getUsers(age,dateTo,dateFrom ,offsetObject);
  res.status(200).send(users);
} catch (error) {
  console.log(error);  
}
};

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
module.exports = { getUsersController, createUserController };
