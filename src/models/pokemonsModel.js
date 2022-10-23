const Sequelize = require("sequelize");
const database = require("../config/db");

const Pokemon = database.define(
  "pokemon",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    treinador: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nivel: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const listar = async () => {
  const pokemonList = await Pokemon.findAll();
  if (pokemonList.length == 0) {
    return "Não há pokemons cadastrados no momento.";
  }
  return pokemonList;
};
const buscarPorId = async (id) => {
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return "ID do pokemon não localizado no banco";
  }
  return pokemon;
};
const criar = async (tipo, treinador) => {
  if (!["pikachu", "mewtwo", "charizard"].includes(tipo)) {
    return {
      message:
        "Tipo de pokemon incorreto, favor inserir pikachu, charizard ou mewtwo.",
    };
  }
  const newPokemon = await Pokemon.create({ tipo: tipo, treinador: treinador });
  return newPokemon;
};
const alterarPorId = async (id, treinador) => {
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return "ID do pokemon não localizado no banco";
  }
  pokemon.treinador = treinador;
  await pokemon.save();
};
const deletarPorId = async (id) => {
  pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return "ID do pokemon não localizado no banco";
  }
  await pokemon.destroy();
};
const subirNivel = async (id) => {
  const pokemon = await Pokemon.findByPk(id);
  pokemon.nivel += 1;
  pokemon.save();
};
const diminuirNivel = async (id) => {
  const pokemon = await Pokemon.findByPk(id);
  pokemon.nivel = 0;

  pokemon.destroy();
};
module.exports = {
  listar,
  buscarPorId,
  criar,
  alterarPorId,
  deletarPorId,
  subirNivel,
  diminuirNivel,
};
