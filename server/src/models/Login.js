const sequelize = require('../../db')
const Sequelize = require('sequelize')

const Usuario = sequelize.define("usuario", {
    usuario: Sequelize.STRING,
    senha: Sequelize.STRING,
});

Usuario.sync({ force: true });

module.exports = Usuario