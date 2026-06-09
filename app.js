const express = require('express')
const app = express()
const pokemonRoutes = require('./routes/pokemon')
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(authRoutes)
app.use(pokemonRoutes)

module.exports = app