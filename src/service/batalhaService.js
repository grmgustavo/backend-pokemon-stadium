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

const salvarResultado = async (pokemonAId, pokemonBId, batalhar) => {
  let vencedorId = 0;
  let perdedorId = 0;
  if (batalhar.vencedor.id == pokemonAId) {
    vencedorId = pokemonAId;
    perdedorId = pokemonBId;
  } else {
    vencedorId = pokemonBId;
    perdedorId = pokemonAId;
  }
  await pokemonsModel.subirNivel(vencedorId);
  await pokemonsModel.diminuirNivel(perdedorId);
};

const batalhar = async (pokemonAId, pokemonBId) => {
  pokemonA = await pokemonsModel.buscarPorId(pokemonAId);
  pokemonB = await pokemonsModel.buscarPorId(pokemonBId);
  const resultadoDabatalha = await determinaVencedor(pokemonA, pokemonB);

  await salvarResultado(pokemonAId, pokemonBId, resultadoDabatalha);

  console.log("Batalha> ");
  return resultadoDabatalha;
};

module.exports = { batalhar };
