const pokemonsModel = require("../models/pokemonsModel");

const determinaVencedor = (pokemonA, pokemonB) => {
  let maior, menor;
  let vencedor, perdedor;
  let resultado;

  if (pokemonA.nivel == pokemonB.nivel) {
    resultado = Math.random() * 2 + 1;
    if (Math.floor(resultado) == 1) {
      vencedor = pokemonA;
      perdedor = pokemonB;
    } else {
      vencedor = pokemonB;
      perdedor = pokemonA;
    }
  } else {
    if (pokemonA.nivel < pokemonB.nivel) {
      maior = pokemonB;
      menor = pokemonA;
    } else {
      maior = pokemonA;
      menor = pokemonB;
    }

    resultado = Math.random() * 3;
    if (Math.floor(resultado) == 0 || Math.floor(resultado) == 1) {
      vencedor = maior;
      perdedor = menor;
    } else {
      vencedor = menor;
      perdedor = maior;
    }
  }

  return { vencedor, perdedor };
};

const batalha = async (req, res) => {
  const { pokemonAId } = req.params;
  const { pokemonBId } = req.params;

  pokemonA = await pokemonsModel.buscarPorId(pokemonAId);
  pokemonB = await pokemonsModel.buscarPorId(pokemonBId);
  const batalhar = await determinaVencedor(pokemonA, pokemonB);

  if (batalhar.vencedor.id == pokemonAId) {
    pokemonsModel.subirNivel(pokemonAId);
    pokemonsModel.diminuirNivel(pokemonBId);
  } else {
    pokemonsModel.subirNivel(pokemonBId);
    pokemonsModel.diminuirNivel(pokemonAId);
  }

  res.status(200).send(batalhar);
};

module.exports = { batalha };
