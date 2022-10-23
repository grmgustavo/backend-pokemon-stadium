const express = require("express");
const pokemonsController = require("../controllers/pokemonsController");

const router = express.Router();

router
  .get("/", pokemonsController.listar)
  .get("/:id", pokemonsController.buscarPorId)
  .post("/", pokemonsController.cadastrar)
  .put("/:id", pokemonsController.alterar)
  .delete("/:id", pokemonsController.deletar);
module.exports = router;
