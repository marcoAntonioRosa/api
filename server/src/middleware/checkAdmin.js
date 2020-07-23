const Login = require('../models/Usuario')

module.exports = (req, res, next) => {
    Login.findOne({ where: {usuario: req.userData.usuario}}).then(usuario => {
        if (!usuario) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        if (!usuario.isAdmin) {
            return res.status(401).json({
                message: 'User unauthorized'
            })
        }
        next();
    })
}
