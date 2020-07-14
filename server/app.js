const express = require('express')
const app = express()

const login = require('./src/routes/loginRoutes')

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/login', login)



module.exports = app