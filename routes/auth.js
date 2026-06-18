const express = require('express')
const router = express.Router()
const prisma = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Pokémon funcionando correctamente 🚀',
    documentacion: {
      auth: {
        'POST /register': 'Registra un usuario nuevo',
        'POST /login': 'Inicia sesión y devuelve un token JWT'
      },
      pokemon: {
        'GET /pokemon': 'Lista todos los pokémons (requiere token)',
        'GET /pokemon/:id': 'Obtiene un pokémon por ID (requiere token)',
        'POST /pokemon': 'Crea un pokémon nuevo (requiere token)',
        'PUT /pokemon/:id': 'Actualiza un pokémon (requiere token)',
        'DELETE /pokemon/:id': 'Elimina un pokémon (requiere token)'
      }
    },
    repo: 'https://github.com/benyiz/prueba-railway-render'
  });
});

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