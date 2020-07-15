const sequelize = require('../../db')
const Sequelize = require('sequelize')

const Usuario = sequelize.define("usuario", {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
            allowNull: false
    }
});

//Usuario.sync({ force: true });

module.exports = Usuario