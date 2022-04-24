const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

Users.hasMany(Posts, {
  foreignKey: "users_id",
  onDelete: "CASCADE",
});

Users.hasMany(Comments, {
  foreignKey: "users_id",
  onDelete: "CASCADE",
});

Posts.belongsTo(Users, {
  foreignKey: "users_id",
});

Posts.hasMany(Comments, {
  foreignKey: "posts_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(Posts, {
  foreignKey: "posts_id",
});

Comments.belongsTo(Users, {
  foreignKey: "users_id",
});

module.exports = { Users, Posts, Comments };
