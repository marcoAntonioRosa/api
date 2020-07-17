const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const usuario = require('./src/routes/usuarioRoutes')

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

app.use('/usuario', usuario)


module.exports = app