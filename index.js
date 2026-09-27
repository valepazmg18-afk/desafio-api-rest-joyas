const express = require("express");
const {
  obtenerJoyas,
  prepararHATEOAS,
  filtrarJoyas,
} = require("./consultas");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Ruta consultada: ${req.method} ${req.url}`);
  next();
});

const PORT = 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "API REST Tienda de Joyas",
  });
});

// Obtener joyas con paginación, límite y ordenamiento
app.get("/joyas", async (req, res) => {
  try {
    const queryStrings = req.query;

    const joyas = await obtenerJoyas(queryStrings);

    const HATEOAS = prepararHATEOAS(joyas);

    res.json(HATEOAS);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener las joyas",
    });
  }
});

// Filtrar joyas
app.get("/joyas/filtros", async (req, res) => {
  try {
    const filtros = req.query;

    const joyas = await filtrarJoyas(filtros);

    res.json(joyas);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al filtrar las joyas",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});