const sequelize = require('../config/connection')
const bcrypt = require("bcrypt")
const {Model,DataTypes} = require('sequelize')

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9_]*$/i,
            len: [5, 20]
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [5]
        }
    }
},{
    hooks: {
        beforeCreate(newUser) {
            newUser.username = newUser.username.toLowerCase();
            newUser.password = bcrypt.hashSync(newUser.password,3)
            return newUser
        }
    },
    sequelize
})

module.exports = User