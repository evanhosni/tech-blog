const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require('../models/User.js')
const {Post} = require('../models')
const {Comment} = require('../models')

router.get('/',(req,res)=>{
    Post.findAll({
        order:["createdAt"],
        include:[User]
    }).then((dat)=>{
        const data = dat.map(post=>post.get({plain:true}))
        if(req.session.user){
            for(const obj of data) {
                obj.loggedIn=true
            }
        }
        res.render("home",{
            post:data
        })
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})

router.get('/login',(req,res)=>{
    res.render("login")
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render("login")
})

router.get('/*',(req,res)=>{
    res.render("home")
})

router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(foundUser=>{
        if (!foundUser){
            req.session.destroy()
            res.status(401).json({message:"cannot find user sry"})
        } else {
            if (bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    id:foundUser.id,
                    username:foundUser.username,
                }
                res.json(foundUser)
            } else {
                req.session.destroy()
                res.status(401).json({message:"cannot find user sry"})
            }
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/signup',(req,res)=>{
    User.create({
        username : req.body.username,
        password : req.body.password
    }).then(newUser=>{
        req.session.user = {
            id: newUser.id,
            username:newUser.username,
        }
        res.json(newUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"couldnt make an account im so sorry"})
    })
})

router.post('/post',(req,res)=>{
    Post.create({
        title: req.body.title,
        content: req.body.content
    }).then(newPost=>{
        res.json(newPost)
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/comment',(req,res)=>{
    comment.create({
        comment: req.body.comment,
        postId: req.body.content,
        userId: req.session.user.id
    }).then(newComment=>{
        res.json(newComment)
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router