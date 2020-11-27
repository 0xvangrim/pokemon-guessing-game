import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pokemon from "../PokemonPage";

const pokemonTrainer = {
  name: "Kenny",
  score: 0,
};

const pokemonList = [
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
  {
    name: "Charizard",
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

describe("When user first sees the pokemon page", () => {
  test("should see the name and the score", async () => {
    render(<Pokemon pokemonTrainer={pokemonTrainer} />);
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Score/)).toBeInTheDocument();
  });

  test("should see the textbox", async () => {
    render(<Pokemon pokemonTrainer={pokemonTrainer} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should see an image on mount", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve({
          name: "Pikachu",
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
              },
            },
          },
        }),
    });
    render(<Pokemon pokemonTrainer={pokemonTrainer} />);
    const imageMount = await waitFor(() => screen.getByRole("img"));
    expect(imageMount).toBeInTheDocument();
  });
});


describe("When user guesses a Pokemon", () => {
  test("should update image when user hits submit", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve({
          name: "Pikachu",
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
              },
            },
          },
        }),
    });
    render(<Pokemon pokemonTrainer={pokemonTrainer} />);
    userEvent.type(await screen.findByRole("textbox"), "Hello");
    userEvent.click(screen.getByRole("button"));
    await waitFor(() => screen.getByRole("img"));
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  test("should have their score updated if they guess the name correctly", async () => {
    const guessedPokemon = "Pikachu";
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve({
          name: "Pikachu",
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
              },
            },
          },
        }),
    });
    render(<Pokemon pokemonTrainer={pokemonTrainer} />);
    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
    await waitFor(() => screen.findByRole("img"));
    userEvent.type(await screen.findByRole("textbox"), guessedPokemon);
    await waitFor(() => userEvent.click(screen.getByRole("button")))
    await waitFor(() => expect(screen.getByText(/Score: 10/)).toBeInTheDocument())
  });
  
  test("should not have their score updated if guessed incorrectly", async () => {
    const guessedPokemon = 'Charizard'

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve({
          name: "Pikachu",
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
              },
            },
          },
        }),
    });
    render(<Pokemon pokemonTrainer={pokemonTrainer} />);
    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
    await waitFor(() => screen.findByRole("img"));
    userEvent.type(await screen.findByRole("textbox"), guessedPokemon);
    await waitFor(() => userEvent.click(screen.getByRole("button")))
    await waitFor(() => expect(screen.getByText(/Score: 0/)).toBeInTheDocument())

  });
  
});