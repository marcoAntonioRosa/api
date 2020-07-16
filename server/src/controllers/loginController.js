const Login = require('../models/Login')
const bCrypt = require('bcrypt')

exports.get = (req, res) => {
    let id = req.params.id;

    Login.findOne({ where: {id: id}}).then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    })
}

exports.getAll = (req, res) => {
    Login.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res) => {
    bCrypt.hash(req.body.senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            let data = {
                usuario: req.body.usuario,
                senha: hash
            }

            Login.create(data).then(response => {
                res.status(201).json(response);
            }).catch((err) => {
                res.status(500).json({
                    error: err
                });
            })
        }
    })
}

exports.update = (req, res) => {
    let id = req.body.id;
    let data = {
        usuario: req.body.usuario,
        senha: req.body.senha
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