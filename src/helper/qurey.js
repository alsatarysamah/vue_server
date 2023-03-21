

const { Op } = require("sequelize");
const { sequelize } = require("../../models");


const wherINJSON = (key, operationName, path, value) => {
  // this function to return where condition if i do search based in any key and any path in Json format
  if (operationName === "like") value = `%${value}%`;
  return sequelize.where(
    sequelize.fn(
      "JSON_VALUE",
      sequelize.col(key),
      sequelize.literal(`"$.${path}"`)
    ),
    {
      [Op[operationName]]: value,
    }
  );
};
const whereINDataType = (key, operationName, value) => {
  // this function to return where condition when i need it includes value in array
  console.log(key,operationName,value);
  if (operationName === "like") value = `%${value}%`;
  return {
    [key]: {
      [Op[operationName]]: value,
    },
  };
};


module.exports = {
  wherINJSON,
  whereINDataType,
};
