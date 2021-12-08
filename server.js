const express = require('express')
const session = require('express-session')
const expresshandlebars = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sequelize = require('./config.connection.js')
const routes = require("./controllers")

const app = express();
const PORT = process.env.PORT || 3000
const hbs = expresshandlebars.create({})

app.engine('handlebars', hbs.engine)
// app.set('view engine', 'handlebars')
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new SequelizeStore({
        db: sequelize
    }),
}))

sequelize.sync({force:false}).then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on http://localhost:${PORT}`)
    })
})