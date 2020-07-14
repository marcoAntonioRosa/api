const Login = require('../models/Login')

exports.get = (req, res, next) => {
    const id = req.params.id;
    Login.findAll().then(response => {
        var find = [];
        var data = JSON.parse(JSON.stringify(response));
        for(var i = 0; i < data.length; i++){
            if(data[i].id == id) {
                find = data[i] ;
                break;
            }
        }
        res.status(200).json(find);
    });
}

exports.getAll = (req, res, next) => {
    Login.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var data = {
        usuario: usuario,
        senha: senha,
    };

    Login.create(data).then(response => {
        res.status(200).json(response);
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var senha = req.body.senha;

    var data = {
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

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Login.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}