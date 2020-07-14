const Sequelize = require('sequelize')

const db = new Sequelize('server', 'server', 'cobom', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: process.env.db_timezone
    },
    logging: false
})

db.authenticate().then(function() {
    console.log("Conecção com o banco de dados estabelecida com sucesso.");
}).catch(function(erro) {
    console.log("Não foi possível se conectar ao banco de dados: " + erro);
});

module.exports = db