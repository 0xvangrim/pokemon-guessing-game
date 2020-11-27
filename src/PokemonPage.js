import React, { useEffect, useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPokemon } from "./getPokemon";

function Pokemon({ pokemonTrainer }) {
  const [pokemonTrainerObject, setPokemonTrainerObject] = useState(pokemonTrainer)
  const [pokemonList, setPokemonList] = useState([]);
  const [value, setValue] = useState("");
  const pokemonRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      pokemonRef.current = await getPokemon();
      setPokemonList((prev) => [
        ...prev,
        { name: pokemonRef.current.name, image: pokemonRef.current.image },
      ]);
    }
    fetchData();
  }, []);

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    pokemonRef.current = await getPokemon();
    setPokemonList((prev) => [
      ...prev,
      { name: pokemonRef.current.name, image: pokemonRef.current.image },
    ]);
    updateScore(value)
    setValue('')
  };

  const updateScore = (guessedPokemonName) => {
    if (guessedPokemonName === pokemonList[pokemonList.length - 1].name) {
      setPokemonTrainerObject(prev => ({...prev, score: pokemonTrainerObject['score']+=5 || 10 }))
    } 
  };

  return (
    <>
      <div className="screen-wrapper">
        <div className="pokemon-wrapper">
          <h1 className="headline">
            Name: {pokemonTrainerObject.name} 
            <br />
            Score: {pokemonTrainerObject.score} 
          </h1>
          {pokemonList[0] ? (
            <img
              src={pokemonList[pokemonList.length - 1].image}
              alt={pokemonList.name}
            />
          ) : null}
          <form
            className="input-wrapper"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              color="primary"
              id="name"
              name="name"
              type="text"
              variant="filled"
              placeholder="E.g. Charizard"
              onChange={handleChange}
              value={value}
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
            >
              Guess
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Pokemon;
