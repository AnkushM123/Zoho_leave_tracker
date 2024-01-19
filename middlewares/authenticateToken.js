const jwt = require('jsonwebtoken');
const secretKey = require('../core/constant/jwtKeys');
const message = require('../core/constant/messages');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: message.authApi.error.tokenMissing });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: message.authApi.error.invalidToken });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken }