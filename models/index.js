const User = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts,{
  foreignKey:'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments,{
  foreignKey:'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id' 
});

Posts.hasMany(Comments, {
  foreignKey: 'posts_id',
  onDelete:'CASCADE'
});

Comments.belongsTo(Posts, {
  foreignKey: 'posts_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User,Posts,Comments };
