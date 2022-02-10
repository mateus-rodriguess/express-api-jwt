const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        res.status(403).json({
            "message": "token not passed"
        })
    } else {
        dotenv.config();
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    name: 'TokenExpiredError',
                    message: 'jwt expired',
                })
            } else {
                req.userId = decoded.userId
                next()
            }
        })
    }
}
function generateAccessToken(userId) {
    dotenv.config();
    return jwt.sign({ userId: userId }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = {
    authenticateToken, generateAccessToken
}