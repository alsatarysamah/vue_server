"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubTask.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id: { type: DataTypes.STRING, allowNull: false },
     
      taskID: { type: DataTypes.STRING, allowNull: false },
      sub: { type: DataTypes.JSON, allowNull: false },
      recordStatus: {
        type: DataTypes.ENUM,
        values: ["LATEST", "UPDATED", "DELETED"],
        allowNull: false,
        defaultValue: "LATEST",
      },
    },
    {
      sequelize,
      modelName: "SubTask",
      initialAutoIncrement: 1000000,
      tableName: "sub_task",
      underscored: true,
      freezeTableName: true,
    }
  );
  return SubTask;
};
