const { batalhar } = require("../service/batalhaService");

jest.mock("../models/pokemonsModel.js", () => ({
  buscarPorId: jest.fn(),
  subirNivel: jest.fn(),
  diminuirNivel: jest.fn(),
}));

const mockDB = require("../models/pokemonsModel.js");

describe(`Batalha Service`, () => {
  test("Shuld return true", () => {
    expect(true).toBe(true);
  });

  test("Pokemon A deveria ganhar do Pokemon B", async () => {
    const esperado = {
      perdedor: {
        id: 1,
        nivel: 1,
        tipo: "pikachu",
        treinador: "b",
      },
      vencedor: {
        id: 1,
        nivel: 1,
        tipo: "pikachu",
        treinador: "b",
      },
    };

    mockDB.buscarPorId.mockResolvedValue({
      id: 1,
      tipo: "pikachu",
      treinador: "b",
      nivel: 1,
    });
    mockDB.subirNivel.mockResolvedValueOnce({});
    mockDB.diminuirNivel.mockResolvedValueOnce({});

    const bat = batalhar;
    const result = await bat({ params: { pokemonAId: 1, pokemonBId: 2 } });

    expect(result).toEqual(esperado);
  });
});
