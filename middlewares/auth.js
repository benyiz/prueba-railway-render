const jwt = require('jsonwebtoken')
require('dotenv').config()

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Token requerido' })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.userId
        next()
    } catch {
        res.status(401).json({ error: 'Token inválido' })
    }
}

module.exports = verificarToken