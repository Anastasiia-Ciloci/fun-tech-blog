const sequelize = require('../config/connection');
const usersData = require('./usersData');
const postsData = require('./postsData');
const commentsData = require('./commentsData');
// const { Users, Posts, Comments } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await usersData();

  await postsData();

  await commentsData();

  process.exit(0);
};

seedAll();