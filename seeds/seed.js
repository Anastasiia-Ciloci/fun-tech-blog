const sequelize = require("../config/connection.js");
const { Users, Posts, Comments } = require("../models");

const userData = require("./userData");
const postData = require("./postData");
const commentData = require("./commentData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Users.bulkCreate(userData, { individualHooks: true, returning: true });
  await Posts.bulkCreate(postData, { individualHooks: true, returning: true });
  await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
