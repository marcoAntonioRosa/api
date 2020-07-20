const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()

const dataBase = process.env.DB_NAME
const usuario = process.env.DB_USER
const senha = process.env.DB_PASS
const host = process.env.DB_HOST
const dialect = process.env.DB_DIALECT
const timeZone = process.env.DB_TIMEZONE

const db = new Sequelize(dataBase, usuario, senha, {
    host: host,
    dialect: dialect,
    dialectOptions: {
        timezone: timeZone
    },
    timezone: timeZone
})

db.authenticate().then(function() {
    console.log("Conecção com o banco de dados estabelecida com sucesso.");
}).catch(function(err) {
    console.log("Não foi possível se conectar ao banco de dados: " + err);
});

module.exports = db