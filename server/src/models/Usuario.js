const sequelize = require('../../db')
const Sequelize = require('sequelize')

const Usuario = sequelize.define("usuario", {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
            allowNull: false
    }
});

//Usuario.sync({ force: true });

module.exports = Usuario