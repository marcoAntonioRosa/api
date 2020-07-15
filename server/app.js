const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const login = require('./src/routes/loginRoutes')

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

app.use('/login', login)



module.exports = app