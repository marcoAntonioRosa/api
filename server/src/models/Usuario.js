const sequelize = require('../../db')
const Sequelize = require('sequelize')

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

//Usuario.sync({ force: true });

Usuario.sync().then(() => {
    console.log("Tabela usuario verificada com sucesso")
}).catch((err) => {
    console.log("Erro ao criar a tabela: " + err)
})

module.exports = Usuario