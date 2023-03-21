const { Op } = require("sequelize");
const sequelize = require("../../models");
const { whereINDataType } = require("../helper/qurey");
// const { wherINJSON, whereINDataType } = require("../helper/qurey.js");

const createNewUser = async (user) => {
  return await sequelize.models.Users.create(user);
};

const getUsers = async ( dateTo, dateFrom, offsetObject) => {
  try {
    console.log({  offsetObject, dateTo, dateFrom });

    const users = await sequelize.models.Users.findAndCountAll({
      where: {
        [Op.and]: [
          dateTo||dateFrom  ? whereINDataType(...getDateOF(dateTo, dateFrom)) : "",
        ],
      },
      ...offsetObject,
    });
    // const users = await sequelize.models.Users.findAll()
    return users;
  } catch (error) {
    // throw error
    console.log(error);
  }
};
const getDateOF = (dateTo, dateFrom) => {
  if (dateTo) return ["dateOfBirth", "gte", dateTo];
  else if (dateFrom) return ["dateOfBirth", "lse", dateFrom];
  else return ["dateOfBirth", "between", [dateTo,dateFrom]];
};
module.exports = { createNewUser, getUsers };
