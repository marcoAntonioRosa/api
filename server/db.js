const Sequelize = require('sequelize')

const { DB_DATABASE, DB_USER, DB_PASS, DB_HOST, DB_DIALECT, DB_TIMEZONE } = process.env;

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    dialectOptions: {
        timezone: DB_TIMEZONE
    },
    timezone: DB_TIMEZONE,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.authenticate().then(() => {
    console.log("Conecção com o banco de dados estabelecida com sucesso.");
}).catch((err) => {
    console.log("Não foi possível se conectar ao banco de dados: " + err);
})

module.exports = db