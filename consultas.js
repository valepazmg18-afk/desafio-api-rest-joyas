const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const obtenerJoyas = async ({
  limits = 5,
  page = 1,
  order_by = "id_ASC",
}) => {
  const [campo, direccion] = order_by.split("_");

  const camposPermitidos = [
    "id",
    "nombre",
    "categoria",
    "metal",
    "precio",
    "stock",
  ];

  const direccionesPermitidas = ["ASC", "DESC"];

  const campoValido = camposPermitidos.includes(campo)
    ? campo
    : "id";

  const direccionValida = direccionesPermitidas.includes(
    direccion?.toUpperCase()
  )
    ? direccion.toUpperCase()
    : "ASC";

  const offset = (page - 1) * limits;

  const consulta = `
    SELECT * FROM inventario
    ORDER BY ${campoValido} ${direccionValida}
    LIMIT $1 OFFSET $2
  `;

  const values = [limits, offset];

  const resultado = await pool.query(consulta, values);

  return resultado.rows;
};

const prepararHATEOAS = (joyas) => {
  const results = joyas.map((joya) => {
    return {
      name: joya.nombre,
      href: `/joyas/${joya.id}`,
    };
  });

  return {
    total: joyas.length,
    results,
  };
};

const filtrarJoyas = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filtros = [];
  let values = [];

  if (precio_min) {
    values.push(precio_min);
    filtros.push(`precio >= $${values.length}`);
  }

  if (precio_max) {
    values.push(precio_max);
    filtros.push(`precio <= $${values.length}`);
  }

  if (categoria) {
    values.push(categoria);
    filtros.push(`categoria = $${values.length}`);
  }

  if (metal) {
    values.push(metal);
    filtros.push(`metal = $${values.length}`);
  }

  let consulta = "SELECT * FROM inventario";

  if (filtros.length > 0) {
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }

  const resultado = await pool.query(consulta, values);

  return resultado.rows;
};

module.exports = {
  pool,
  obtenerJoyas,
  prepararHATEOAS,
  filtrarJoyas,
};