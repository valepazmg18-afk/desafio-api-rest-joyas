# Tienda de Joyas - API REST

API REST desarrollada con Node.js, Express y PostgreSQL para consultar el inventario de una tienda de joyas.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- nodemon

## Funcionalidades

### GET /joyas

Permite obtener las joyas almacenadas en la base de datos utilizando los siguientes parámetros:

- `limits`: cantidad de resultados por página
- `page`: número de página
- `order_by`: campo y dirección de ordenamiento

Ejemplo:

http://localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC

La respuesta utiliza una estructura HATEOAS.

### GET /joyas/filtros

Permite filtrar las joyas por:

- `precio_min`
- `precio_max`
- `categoria`
- `metal`

Ejemplo:

http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata

Las consultas de esta ruta utilizan parámetros para evitar SQL Injection.

## Middleware

La aplicación incluye un middleware que registra en consola la ruta consultada.

Ejemplo:

Ruta consultada: GET /joyas?limits=3

## Manejo de errores

Las rutas utilizan `try/catch` para capturar posibles errores durante las consultas a la base de datos.

## Instalación

Instalar las dependencias:

npm install

Crear un archivo `.env` con la configuración de PostgreSQL:

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=joyas
DB_PORT=5432

Iniciar el servidor:

npm run dev

El servidor se ejecutará en:

http://localhost:3000

## Estado del proyecto

Proyecto completado y probado correctamente.

La API permite consultar y filtrar el inventario de joyas utilizando paginación, ordenamiento, HATEOAS, middlewares y consultas parametrizadas.

## Autora

Desarrollado por Valentina Muñoz ✨