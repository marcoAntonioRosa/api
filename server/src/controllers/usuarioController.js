const Login = require('../models/Usuario')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    if (!req.body.usuario) {
        return res.status(411).json({
            message: "Nome de usuário muito curto"
        })
    } else {
        let usuario = req.body.usuario
        Login.findOne({ where: {usuario: usuario}}).then(response => {
            if (response) {
                return res.status(409).json({
                    message: 'Usuario ja existe'
                })
            } else {
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
        })
    }
}

exports.login = (req, res) => {
    let usuario = req.body.usuario
    let senha = req.body.senha
    if (!usuario || !senha) {
        return res.status(411).json({
            message: "Nome de usuário ou senha muito curtos"
        })
    } else {
        Login.findOne({ where: {usuario: usuario}}).then(usuario => {
            if (!usuario) {
                return res.status(401).json({
                    message: 'Login ou senha incorretos'
                })
            } else {
                bCrypt.compare(senha, usuario.senha, (err, result) => {
                    if (result && !err) {
                        const token = jwt.sign({
                            usuario: usuario.usuario,
                            senha: usuario.senha
                        },
                            "cobom",
                            {
                                expiresIn: "1h"
                            },

                            )
                        return res.status(200).json({
                            token: token,
                            message: 'Logado!'
                        })
                    } else {
                        return res.status(401).json({
                            message: 'Login ou senha incorretos'
                        })
                    }
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
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