const { batalhar } = require("../service/batalhaService");

const batalha = async (req, res) => {
  const { pokemonAId } = req.params;
  const { pokemonBId } = req.params;

  const resuldato = await batalhar(pokemonAId, pokemonBId);

  res.status(200).send(resuldato);
};

module.exports = { batalha };
