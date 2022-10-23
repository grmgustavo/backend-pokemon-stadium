const express = require("express");
const batalhasController = require("../controllers/batalhasController");
const router = express.Router();

router.get("/:pokemonAId/:pokemonBId", batalhasController.batalha);

module.exports = router;
