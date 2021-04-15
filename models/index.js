const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

Post.belongsTo(User, { 
    foreignKey: "userId", 
    onDelete: "CASCADE"
})
Comments.belongsTo(User, { 
    foreignKey: "userId", 
    onDelete: "CASCADE"
})
Post.hasMany(Comments, { 
    foreignKey: "postId", 
    onDelete: "CASCADE"
})


module.exports = { User, Post, Comments }
