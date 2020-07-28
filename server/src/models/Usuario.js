const sequelize = require('../../db')
const Sequelize = require('sequelize')
const bCrypt = require('bcrypt')

const Usuario = sequelize.define("usuario", {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        //allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    passwordResetExpires: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

Usuario.afterValidate(async (usuario, options) => {
    usuario.senha = await bCrypt.hash(usuario.senha, 10)
});

//Usuario.sync({ force: true });

Usuario.sync().then(() => {
    console.log("Table verification successful")
}).catch((err) => {
    console.log("Error on table verification: " + err)
})

module.exports = Usuario