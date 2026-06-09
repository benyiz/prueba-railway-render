const express = require("express");
const router = express.Router();
const prisma = require('../db')
const verificarToken = require('../middlewares/auth')

router.get("/pokemon", verificarToken, async (req, res) => {
  const pokemons = await prisma.pokemons.findMany()
  res.json(pokemons)
});

router.get("/pokemon/:id", verificarToken, async (req, res) => {
  const resultado = await prisma.pokemons.findUnique({ where: { id: Number(req.params.id) } });
  if (!resultado) {
    res.status(404).json({ error: "Pokemon no encontrado" });
  } else {
    res.json(resultado);
  }
});

router.post("/pokemon", verificarToken, async (req, res) => {
  await prisma.pokemons.create({ data: req.body });
  res.status(201).json(req.body);
});

router.delete("/pokemon/:id", verificarToken, async (req, res) => {
  pokemons = await prisma.pokemons.delete({ where: { id: Number(req.params.id) } });
  res.json({ mensaje: "Pokemon eliminado" });
});

router.put("/pokemon/:id", verificarToken, async (req, res) => {
  await prisma.pokemons.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json({ mensaje: "Pokemon modificado" });
});

module.exports = router