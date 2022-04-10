const { Comment } = require('../models');

const commentData = [
  {
    comment_data: 'This blog is amazing!',
    user_id: 1,
    post_id: 1
  },
  {
    comment_data: 'You did a great job on creating this blog!',
    user_id: 2,
    post_id: 2
  },
  {
    comment_data: 'Anastasia is the best!',
    user_id: 3,
    post_id: 3
  },
  {
    comment_data: 'Programming is fun!',
    user_id: 4,
    post_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;