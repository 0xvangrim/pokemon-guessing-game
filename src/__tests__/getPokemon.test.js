import { getPokemon } from "../services/getPokemon";

const pokemonObject = {
  name: "pikachu",
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
    },
  },
};

describe.only("makes sure our fetch function works properly", () => {
  beforeEach(() =>
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(pokemonObject),
    })
  );
  test("should be be called only 1 time and return an object based on the URL", async () => {
    const pokemonFetcher = await getPokemon(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(pokemonFetcher).toEqual({
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      name: "pikachu",
    });
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
  });

  test("should be in the catch block when the fetch fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("The API is down"));
    const pokemonFetcher = await getPokemon(1);
    expect(pokemonFetcher).toEqual(undefined);
  });

  afterEach(() => fetch.mockClear());
});
