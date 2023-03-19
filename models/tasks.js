'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    task_id: DataTypes.STRING,
    creator: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    claimed: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    created_date: DataTypes.STRING,
    created_time: DataTypes.STRING,
    due_date: DataTypes.STRING,
    due_time: DataTypes.STRING,
    estimated_time: DataTypes.STRING,
    work_status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};