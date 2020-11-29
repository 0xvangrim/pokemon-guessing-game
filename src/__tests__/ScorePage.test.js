import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScorePage from '../ScorePage'

describe("When the game is over", () => {
    const pokemonTrainerObject = {
        name: "Kenny",
        score: 10,
      }

    test("should see the game over screen with your score", () => {
        render(<ScorePage pokemonTrainer={pokemonTrainerObject} />)
        expect(screen.getByText("GAME OVER")).toBeInTheDocument()
        expect(screen.getByText(pokemonTrainerObject.score)).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeInTheDocument()
    })

    test("should be redirected to the main page when you click the 'play again' button", () => {
        render(<ScorePage pokemonTrainer={pokemonTrainerObject} />)
        userEvent.click(screen.getByRole("button"));
        expect(screen.getByText(/Hello Pokémon Trainer/)).toBeInTheDocument()
    })
})