import "./App.css";
import PokemonPage from "./PokemonPage";
import App from './App'
import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function ScorePage({ pokemonTrainer }) {
  const [playAgain, setPlayAgain] = useState(false);
  return (
    <>
      {playAgain ? (
        <App />
      ) : (
        <div className="screen-wrapper">
          <div className="pokemon-wrapper">
            <h1 className="headline">GAME OVER</h1>
            <h1>
              Your final score is:          
            </h1>
            <h1> <b>{pokemonTrainer.score}</b></h1>
            <div className="button-wrapper">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
                onClick={() => setPlayAgain(true)}
              >
                Play again?
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ScorePage;
