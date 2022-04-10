const { Users } = require('../models');

const usernameData = 
[{
    username: 'malibu_ca',
    email: 'malibu@gmail.com',
    password: 'malibulove'
  },
  {
    username: 'honolulu_hi',
    email: 'honolulu@gmail.com',
    password: 'honolulu2022'
  },
  {
    username: 'richmond_va',
    email: 'richmond@g.com',
    password: 'richmondcool'
  }
];

const seedUser = () => Users.bulkCreate(usernameData);

module.exports = seedUser;