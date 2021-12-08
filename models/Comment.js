const sequelize = require('../config/connection')
const bcrypt = require("bcrypt")
const {Model,DataTypes} = require('sequelize')

class Comment extends Model {}

Comment.init({
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    }
},{
    hooks: {
        beforeCreate(newComment) {
            newComment.comment = newComment.comment.toLowerCase();
            return newComment
        }
    },
    sequelize
})

module.exports = Comment