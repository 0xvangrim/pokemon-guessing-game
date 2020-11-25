import "./App.css";
import "fontsource-roboto";
import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'



function App() {
  const [pokemonTrainer, setPokemonTrainer] = useState({
    name: "",
    pokemons: 0,
  });
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')
  
  const handleChange = e => { 
    setValue(e.target.value) }

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = value
    if(!name) {
      setError(true)
    } else {
      setPokemonTrainer((prevState) => (
        {...prevState,  name, }
      ))
    }
  };


  return (
    <>
       {pokemonTrainer.name ? <Pokemon name={pokemonTrainer.name}/> :
    <div className="screen-wrapper">
    <div className="login-wrapper">
      <h1 className="headline">
        Hello Pokémon Trainer! Write your name below to start the adventure
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
          label={error ? "Error" : ''}
          helperText={error ? "Write a valid name" : ''}
          variant="filled"
          placeholder="Ash Ketchum"
          value={value}
          onChange={handleChange}
        />
        <Button color="primary" variant="contained" type="submit" size="large">Let's Go</Button>
      </form>
    </div>
    </div>}
    </>
  );
} 

export default App;