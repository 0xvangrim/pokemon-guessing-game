import "./App.css";
import "fontsource-roboto";
import React, { useState, useEffect } from "react";
import Pokemon from "./PokemonPage";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function App() {
  const [pokemonTrainer, setPokemonTrainer] = useState({
    name: "",
    score: 0,
  });
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = value;
    if (!name) {
      setError(true);
    } else {
      setPokemonTrainer((prevState) => ({ ...prevState, name }));
    }
  };

  return (
    <>
      {pokemonTrainer.name ? (
        <Pokemon pokemonTrainer={pokemonTrainer} />
      ) : (
        <div className="screen-wrapper">
          <div className="pokemon-wrapper">
            <h1 className="headline">
              Hello Pokémon Trainer!
            </h1>
            <form
              className="input-wrapper"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <TextField
                color="primary"
                error={error}
                id="name"
                name="name"
                type="text"
                label={error ? "Error" : ""}
                helperText={error ? "Write a valid name" : ""}
                variant="filled"
                placeholder="E.g. Ash Ketchum"
                value={value}
                onChange={handleChange}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
              >
                Let's Go
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
