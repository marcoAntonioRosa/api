const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        let token;
        let decodedToken;

        token = req.headers.authorization.split(" ")[1]
        console.log(token)
        decodedToken = jwt.verify(token, process.env.DB_TOKEN)
        req.userData = decodedToken
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

}
