"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskUser.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id: { type: DataTypes.STRING, allowNull: false },
     
      taskID: { type: DataTypes.STRING, allowNull: false },
      users: { type: DataTypes.JSON, allowNull: false },
      recordStatus: {
        type: DataTypes.ENUM,
        values: ["LATEST", "UPDATED", "DELETED"],
        allowNull: false,
        defaultValue: "LATEST",
      },
    },
    {
      sequelize,
      modelName: "TaskUser",
      initialAutoIncrement: 1000000,
      tableName: "task_user",
      underscored: true,
      freezeTableName: true,
    }
  );
  return TaskUser;
};
