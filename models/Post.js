const sequelize = require('../config/connection')
const bcrypt = require("bcrypt")
const {Model,DataTypes} = require('sequelize')

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        validate: {
            len: [3,50]
        }
    },
    content: {
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    },
    timestamp: {
        type: DataTypes.DATE
    }
},{
    hooks: {
        beforeCreate(newPost) {
            newPost.title = newPost.title.toLowerCase();
            newPost.content = newPost.content.toLowerCase();
            return newPost
        }
    },
    sequelize
})

module.exports = Post