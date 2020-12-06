import React, { useEffect, useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPokemon } from "../services/getPokemon";
import ScorePage from "./ScorePage";

function Pokemon({ pokemonTrainer }) {
  const [pokemonTrainerObject, setPokemonTrainerObject] = useState(
    pokemonTrainer
  );
  const [pokemonList, setPokemonList] = useState([]);
  const [value, setValue] = useState("");
  const [countdown, setCountdown] = useState(60);
  const pokemonRef = useRef(null);
  const countDownRef = useRef(null);
  const isMountedRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    async function fetchData() {
      pokemonRef.current = await getPokemon(pokemonId);
      if(isMountedRef.current) {
      setPokemonList((prev) => [
        ...prev,
        { name: pokemonRef.current.name, image: pokemonRef.current.image },
      ]);
    }
    }
    fetchData();
    return () => isMountedRef.current = false
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    countDownRef.current = setTimeout(() => {
      if(isMountedRef.current) { 
      setCountdown(countdown - 1);
      }
    }, 1000);
    if (countdown === 0) {
      clearTimeout(countDownRef.current);
      setCountdown(0)
    }
    return () => isMountedRef.current = false
  }, [countdown]);

  const handleChange = (e) => setValue(e.target.value);

  const createRandomPokemonId = () => Math.floor(Math.random() * 151 + 1);
  const pokemonId = createRandomPokemonId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    pokemonRef.current = await getPokemon(pokemonId);
    setPokemonList((prev) => [
      ...prev,
      { name: pokemonRef.current.name, image: pokemonRef.current.image },
    ]);
    updateScore(value);
    setValue("");
  };

  const updateScore = (guessedPokemonName) => {
    const parsedPokemonName = guessedPokemonName.toLowerCase()
    if (parsedPokemonName === pokemonList[pokemonList.length - 1].name) {
      setPokemonTrainerObject((prev) => ({ ...prev, score: prev.score + 10 }));
    }
  };

  return (
    <>
      {countdown === 0 ? (
        <ScorePage pokemonTrainer={pokemonTrainerObject} />
      ) : (
        <div className="screen-wrapper">
          <div className="pokemon-wrapper">
            <div className="headline-wrapper">
              <h1>
                NAME: {pokemonTrainerObject.name}
                <br />
                SCORE: {pokemonTrainerObject.score}
                <br />
                TIME LEFT: {countdown}{" "}
              </h1>
            </div>
            {pokemonList[0] ? (
              <div className="img-wrapper">
                <img
                  src={pokemonList[pokemonList.length - 1].image}
                  alt={pokemonList.name}
                />
              </div>
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
                variant="standard"
                placeholder="E.g. Charizard"
                onChange={handleChange}
                value={value}
                autoFocus
                size="medium"
                style={{
                  backgroundColor: "white",
                }}
                InputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <div className="button-wrapper">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  Guess
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Pokemon;
