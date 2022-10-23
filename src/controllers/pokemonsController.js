const pokemonsModel = require("../models/pokemonsModel");

// Listar todos
const listar = async (req, res) => {
  const pokemonList = await pokemonsModel.listar();
  if (typeof pokemonList === "string") {
    return res.status(204).send(pokemonList);
  }
  return res.status(200).send(pokemonList);
};
const buscarPorId = async (req, res) => {
  const pokemon = await pokemonsModel.buscarPorId(req.params.id);
  if (typeof pokemon === "string") {
    return res.status(404).send(pokemon);
  }
  return res.status(200).send(pokemon);
};
const cadastrar = async (req, res) => {
  const newPokemon = await pokemonsModel.criar(
    req.body.tipo,
    req.body.treinador
  );
  return res.status(201).send(newPokemon);
};
const alterar = async (req, res) => {
  await pokemonsModel.alterarPorId(req.params.id, req.body.treinador);
  return res.status(204).end();
};

const deletar = async (req, res) => {
  await pokemonsModel.deletarPorId(req.params.id);
  return res.status(204).end();
};

module.exports = { listar, buscarPorId, cadastrar, alterar, deletar };
