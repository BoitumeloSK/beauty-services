const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    },
    //add isActive
  },
  {
    freezeTableName: true,
  }
);
module.exports = User;
