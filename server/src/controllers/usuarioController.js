const Login = require('../models/Usuario')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require ('crypto')
const mailer = require('../modules/mailer')

exports.get = (req, res) => {
    let { id } = req.params;

    Login.findOne({ where: { id }}).then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    })
}

exports.getAll = (req, res) => {
    Login.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.signup = (req, res) => {
    let { usuario, email, senha } = req.body;

    if (!usuario)
        return res.status(411).json({ message: "Username is too short" })

    if (!email)
        return res.status(411).json({ message: "Email is too short" })

    if (!senha)
        return res.status(411).json({ message: "Password is too short" })

    Login.findOne({ where: { usuario }}).then(response => {
        if (response)
            return res.status(409).json({ message: 'User already exists' })

        let data = {
            usuario: usuario,
            email: email,
            senha: senha,
            isAdmin: false
        }
        Login.create(data).then(response => {
            res.status(201).json(response);
        }).catch((err) => {
            res.status(500).json({ error: err });
        })
    })
}

exports.login = (req, res) => {
    let { usuario, senha } = req.body;
    let { ACCESS_TOKEN } = process.env;

    if (!usuario || !senha)
        return res.status(411).json({ message: "Username or password is too short" })

    Login.findOne({ where: { usuario }}).then(usuario => {
        if (!usuario)
            return res.status(401).json({ message: 'Incorrect username is password' })

        bCrypt.compare(senha, usuario.senha, (err) => {
            if (err)
                return res.status(401).json({ message: 'Login ou senha incorretos' })

            let loginAndPassword = {
                usuario: usuario.usuario,
                senha: usuario.senha
            }
            const token = jwt.sign({ loginAndPassword }, ACCESS_TOKEN, { expiresIn: "8h" })
            return res.status(200).json({ token: token })
        })
    }).catch((err) => { console.log(err) })
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await Login.findOne({where: { email }})

        if (!user)
            return res.status(404).json({ error: 'User not found' })

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Login.update(
            { passwordResetToken: token, passwordResetExpires: now },
            { where: { id: user.id }}
        ).catch((err) => {
            return res.status(500).json({ error: err });
        })

        let corpoEmail = {
            from: 'naoresponda@prontuario.com.br',
            to: email,
            subject: 'Resetar a senha',
            html: '<h1>Segue o código para resetar sua senha</h1>' + token
        }

        mailer.sendMail(corpoEmail, (err, info) => {
            if (err) {
                return res.status(400).json({ error: 'Could not send email.' + err })
            }
            return res.status(200).json({Email: + info.response})
        })

    } catch (err) {
        res.status(400).json({ error: 'Error on forgot password. Try again.' + err })
    }
}

exports.resetPassword = async (req, res) => {
    const { email, token, password } = req.body;
    const now = new Date();

    try {
        const user = await Login.findOne({ where: { email }})

        if (!user)
            return res.status(404).json({ error: 'User not found' })

        if (token !== user.passwordResetToken)
            return res.status(401).json({ error: 'Incorrect token' })

        if (now > user.passwordResetExpires)
            return res.status(401).json({ error: 'Token expired, generate a new one' })

        bCrypt.hash(password, 10, (err, hash) => {
            if (err)
                return res.status(500).json({ error: err })

            Login.update({senha: hash}, { where: { email }}).then(response => {
                res.status(200).json(response);
            }).catch((err) => {
                res.status(500).json({
                    error: err
                });
            })
        })
    } catch (err) {
        res.status(400).json({ error: 'Error on reset password. Try again.' + err })
    }
}

exports.update = (req, res) => {
    let { id, usuario, email, senha, isAdmin } = req.body;

    let data = {
        usuario: usuario,
        email: email,
        senha: senha,
        isAdmin: isAdmin
    };

    Login.update(data, { where: {id: id}}).then(response => {
        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json({ error: err });
    })
}

exports.delete = (req, res) => {
    let { id } = req.params;

    if (!id)
        return res.status(404).json({ message: "Id was not found" })

    Login.destroy({ where: { id }}).then(response => {
        res.status(200).json(response);
    });
}