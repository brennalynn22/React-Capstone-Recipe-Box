const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  User: sequelize.define("user", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
  }),
};
