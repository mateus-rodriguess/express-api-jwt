const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require("express-session")
const { errors } = require('celebrate')
const passport = require("passport")
// app
const app = express();

// session
app.use(session({
    secret: "secrect",
    resave: true,
    saveUninitialized: true
}))

// db
mongoose.connect('mongodb://localhost/nodeapi').then(() => {
    console.log("DB OK")
}).catch((erro) => {
    console.log("erro de DB: " + erro)
})
mongoose.Promise = global.Promise

// passport
app.use(passport.initialize())
app.use(passport.session());

require("./auth")(passport)

// body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// middleware
app.use((req, res, next) => {
    console.log('Request Type:', req.method + " - " + res.statusCode + " - " + req.url);
    res.set('Access-Control-Allow-Origin', '*')

    next();
})

// rotas 
const post = require('../app/routes/api/post')
const account = require("../app/routes/api/accounts")
app.use("/api", post)
app.use("/api", account)

//celebrate
app.use(errors())

///// ---- ////
module.exports = app;