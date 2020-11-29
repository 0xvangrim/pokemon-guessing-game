import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("When everything is ok", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("should render the start page", () => {
    screen.getByText(/Hello Pokémon Trainer./);
    screen.getByRole("button");
    screen.getByRole("textbox");
    screen.getByAltText("pokeball")
    screen.getByPlaceholderText("E.g. Ash Ketchum")
  });


});

describe("When user submits a name", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("should render the pokemon view", () => {
    const name = "Kenny";
    userEvent.type(screen.getByRole("textbox"), name);
    expect(screen.getByRole("textbox")).toHaveValue(name);
    userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText(/NAME/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/SCORE/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/TIME LEFT/)
    ).toBeInTheDocument();
  });
});

describe("When the users enters an invalid name", () => {
  beforeEach(() => {
    render(<App />);
  });

  const name = "";
  test("should show an error message on the screen", () => {
    userEvent.type(screen.getByRole("textbox"), name);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByLabelText("Error")).toBeInTheDocument();
    expect(screen.getByText(/Write a valid name/)).toBeInTheDocument()
  });
});
