const express = require('express')
const app = express()

const usuario = require('./src/routes/usuarioRoutes')
const checkAuth = require('./src/middleware/checkAuth')

app.use(express.json())

app.get('/', checkAuth, (req, res) => {
    res.send('Hello World')
})

app.use('/usuario', usuario)

module.exports = app