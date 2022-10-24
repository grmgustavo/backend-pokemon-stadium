const express = require("express");
const app = express();
const pokemonsRouter = require("./routes/pokemonsRoutes");
const batalhasRouter = require("./routes/batalhasRoutes");

const sequelize = require("./config/db");
const Produto = require("./models/pokemonsModel");

const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

setTimeout(() => {
  sequelize
    .authenticate()
    .then(() => {
      sequelize.sync();
      console.log("Conexão com o banco de dados realizada!");
    })
    .catch((err) => {
      console.log(err);
    });
}, 10000);

app
  .use(cors())
  .use(express.json())
  .use("/pokemons", pokemonsRouter)
  .use("/batalhar", batalhasRouter)
  .use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
