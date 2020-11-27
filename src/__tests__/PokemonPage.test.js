import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pokemon from "../PokemonPage";
import { getPokemon } from "../getPokemon";

describe("When user first sees the pokemon page", () => {


  const pokemonTrainer = {
    name: "Kenny",
    score: 0,
  };

  const pokemonList = [
    {
      name: "Charizard",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
          },
        },
      },
    },
    {
      name: "Pikachu",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
          },
        },
      },
    },
  ];


test.only("should see the name and the score", async () => {
  render(<Pokemon pokemonTrainer={pokemonTrainer} />);
  expect(screen.getByText(/Name/)).toBeInTheDocument()
  expect(screen.getByText(/Score/)).toBeInTheDocument()
})

test.only("should see the textbox", async () => {
  render(<Pokemon pokemonTrainer={pokemonTrainer} />)
  expect(screen.getByRole("textbox")).toBeInTheDocument()
})

test.only("should update image when user hits submit", async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({json: () => Promise.resolve({
    name: "Pikachu",
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
      },
    },
  },)});
  render(<Pokemon pokemonTrainer={pokemonTrainer} />)
  userEvent.type(await screen.findByRole("textbox"), 'Hello')
  userEvent.click( screen.getByRole("button"));
  screen.debug()
});
/*
  test.only("should see a random pokemon", async () => {
    const pokemonFetch = await getPokemon();
    expect(pokemonFetch).toBe(undefined)
  });
*/

  /*
  
  test("should see an input box", () => {});

*/

});


/*
describe("When user guesses a Pokemon", () => {
  test("should see a new randomized Pokemon when they click guess button", () => {});

  test("should have their score updated if they guess the name correctly", async () => {});

  test("should not have their score updated if guessed incorrectly", async () => {});
}); 
*/
