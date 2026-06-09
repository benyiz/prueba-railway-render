const express = require('express')
const router = express.Router()
const prisma = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.users.create({
        data: { email, password: hash }
    })
    res.status(201).json({ mensaje: 'Usuario creado', id: user.id })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.users.findUnique({ where: { email } })
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
    }
    const passwordValida = await bcrypt.compare(password, user.password)
    if (!passwordValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    res.json({ token })
})

module.exports = router