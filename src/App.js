import "./App.css";
import React, { useState } from "react";
import Pokemon from "./components/PokemonPage";
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
            <img src="hiclipart.com.png" alt="pokeball" width="30%"/>
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
                autoFocus
                onChange={handleChange}
                style={{
                  backgroundColor: "white"
              }}
              InputProps={{
                  style: {
                      color: "black"
                  }
              }}
              />
              <div className="button-wrapper">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
              >
                Let's Go
              </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
