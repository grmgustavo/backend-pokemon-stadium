const { batalhar } = require("../service/batalhaService");

const batalha = async (req, res) => {
  const { pokemonAId } = req.params;
  const { pokemonBId } = req.params;

  console.log("  Start Result Batle ");
  const resuldato = await batalhar(pokemonAId, pokemonBId);
  console.log("  and Result Batle ");

  res.status(200).send(resuldato);
};

module.exports = { batalha };
