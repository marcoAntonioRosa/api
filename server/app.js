const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const usuario = require('./src/routes/usuarioRoutes')
const checkAuth = require('./src/middleware/checkAuth')

app.get('/', checkAuth, (req, res) => {
    res.send('Hello World')
})

app.use(bodyParser.json())

app.use('/usuario', usuario)


module.exports = app