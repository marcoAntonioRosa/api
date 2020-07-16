const Login = require('../models/Login')

exports.get = (req, res) => {
    let id = req.params.id;

    Login.findOne({ where: {id: id}}).then(response => {
        console.log('Exibindo um usuário')
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    })
}

exports.getAll = (req, res) => {
    Login.findAll().then(response => {
        console.log('Exibindo todos os usuários')
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res) => {
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    let data = {
        usuario: usuario,
        senha: senha,
    };

    Login.create(data).then(response => {
        console.log('Usuário criado')
        res.status(200).json(response);
    })
}

exports.update = (req, res) => {
    let id = req.body.id;
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    let data = {
        usuario: usuario,
        senha: senha,
    };

    Login.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;
    Login.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}