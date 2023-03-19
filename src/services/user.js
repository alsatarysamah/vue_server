const { Op } = require("sequelize");
const sequelize = require("../../models");

const createNewUser = async (user) => {
  return await sequelize.models.Users.create(user);
};

const getUsers = async (limit, offset) => {
  // return await sequelize.models.Users.findAll()
  try {
    
      const users = await sequelize.models.Users.findAndCountAll({
        where: {
          age: { [Op.gt]: 10 },
        },
        ...limit,...offset
        // limit: limit,
        // offset: offset,
      });
      
      return users;
  } catch (error) {
    console.log(error)
  }
};
module.exports = { createNewUser, getUsers };
