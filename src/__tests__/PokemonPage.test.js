import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pokemon from "../components/PokemonPage";

const pokemonTrainerObject = {
  name: "Kenny",
  score: 0,
};

const pokemonObject = {
  name: "Pikachu",
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
    },
  },
};

describe("When user first sees the pokemon page", () => {
  test("should see the name and the score", () => {
    render(<Pokemon pokemonTrainer={pokemonTrainerObject} />);
    expect(screen.getByText(/NAME/)).toBeInTheDocument();
    expect(screen.getByText(/SCORE/)).toBeInTheDocument();
    expect(screen.getByText(/TIME LEFT/)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E.g. Charizard")).toBeInTheDocument();
  });

  test("should see an image on mount", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(pokemonObject),
    });
    render(<Pokemon pokemonTrainer={pokemonTrainerObject} />);
    const imageMount = await screen.findByRole("img");
    expect(imageMount).toBeInTheDocument();
  });
  afterAll(() => fetch.mockClear());
});

describe("When user guesses a Pokemon", () => {
  beforeEach(() =>
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(pokemonObject),
    })
  );
  test("should update image when user hits submit", async () => {
    render(<Pokemon pokemonTrainer={pokemonTrainerObject} />);
    userEvent.type(await screen.findByRole("textbox"), "Hello");
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("img")).toBeInTheDocument();
  });
  test("should have their score updated if they guess the name correctly", async () => {
    const guessedPokemon = "Pikachu";
    render(<Pokemon pokemonTrainer={pokemonTrainerObject} />);
    expect(screen.getByText(/SCORE: 0/)).toBeInTheDocument();
    await screen.findByRole("img");
    userEvent.type(await screen.findByRole("textbox"), guessedPokemon);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/SCORE: 10/)).toBeInTheDocument();
  });

  test("should not have their score updated if guessed incorrectly", async () => {
    const guessedPokemon = "Charizard";
    render(<Pokemon pokemonTrainer={pokemonTrainerObject} />);
    expect(screen.getByText(/SCORE: 0/)).toBeInTheDocument();
    await screen.findByRole("img");
    userEvent.type(await screen.findByRole("textbox"), guessedPokemon);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/SCORE: 0/)).toBeInTheDocument();
  });
  afterAll(() => fetch.mockClear());
});

describe("When the game ends", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(pokemonObject),
    });
    jest.useFakeTimers();
  });
  
  test("should be presented with a screen that shows score when timer hits 0", async () => {
    const guessedPokemon = "Pikachu";
    render(<Pokemon pokemonTrainer={pokemonTrainerObject} />);
    await screen.findByRole("img");
    userEvent.type(await screen.findByRole("textbox"), guessedPokemon);
    userEvent.click(screen.getByRole("button"));
    await waitFor(() => jest.advanceTimersByTime(61000));
    expect(await screen.findByText(/GAME OVER/)).toBeInTheDocument();
  });

  afterAll(() => {
    fetch.mockClear();
    jest.useRealTimers();
  });
});
