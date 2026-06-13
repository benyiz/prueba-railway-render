const express = require("express");
const app = express();
const pokemonRoutes = require("./routes/pokemon");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// Rate limiting general - todas las rutas
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { error: "Demasiadas requests, intentá de nuevo en 15 minutos" },
});

// Rate limiting estricto - rutas sensibles
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5,
  message: { error: "Demasiados intentos, intentá de nuevo en 1 minuto" },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(generalLimiter);

app.use("/login", authLimiter);
app.use("/register", authLimiter);

app.use(authRoutes);
app.use(pokemonRoutes);

module.exports = app;
