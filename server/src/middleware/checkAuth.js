const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        let token;

        token = req.headers.authorization.split(" ")[1]
        req.userData = jwt.verify(token, process.env.DB_TOKEN)
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Error on authentication'
        })
    }
}
