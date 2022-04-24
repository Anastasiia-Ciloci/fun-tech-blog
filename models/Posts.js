const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [50] },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    post_data: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [50] },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "posts",
  }
);

module.exports = Posts;
