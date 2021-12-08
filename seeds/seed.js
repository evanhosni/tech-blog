const sequelize = require("../config/connection");
const {User,Post,Comment} = require("../models")

const seed = async () => {
    const userData = await User.bulkCreate([
        {
            username:"billybongthorton",
            password:"wesleypipes123",
        },
        {
            username:"monke420",
            password:"chimp123",
        },
        {
            username:"steven_",
            password:"ilovesharks",
        },
    ],{
        individualHooks:true
    })
    const postData = await Post.bulkCreate([
        {
            title: "hey guys",
            content: "hey does anyone read this stuff? if so can u comment to let a boi know",
            UserId:1
        },
        {
            title: "the frilled shark",
            content: "has a gestation period of like 3.5 years its insane",
            UserId:2
        },
        {
            title: "anyone wanna get on halo",
            content: "i would rather be playing halo right now than doing this hw. ngl",
            UserId:1
        },
    ])
    const commentData = await Comment.bulkCreate([
        {
            comment: "umm hi :3",
            UserId:1,
            PostId:1
        },
        {
            comment: "i still am shaking and crying rn cuz one washed up off the coast of japan in 2007",
            UserId:2,
            PostId:2
        },
        {
            comment: "dude will you stfu about sharks already jesus",
            UserId:1,
            PostId:2
        },
    ])
    if(err) throw err
}

sequelize.sync({force:true}).then(()=>{
    seed();
})