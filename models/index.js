const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

User.hasMany(Post,{
    onDelete:"CASCADE"
})

User.hasMany(Comment,{
    onDelete:"CASCADE"
})

Post.belongsTo(User)

Post.hasMany(Comment,{
    onDelete: "CASCADE"
})

Comment.belongsTo(User)

Comment.belongsTo(Post)

module.exports = {
    User,
    Post,
    Comment
}