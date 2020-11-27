import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("When everything is ok", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("should render headline", () => {
    screen.getByText(/Hello Pokémon Trainer./);
    screen.getByRole("button");
  });

  test("should render textbox", () => {
    screen.getByRole("textbox");
  });

  test("should render button", () => {
    screen.getByRole("button");
  });
});

describe("When user submits a name", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("should render a new view", () => {
    const name = "Kenny";
    userEvent.type(screen.getByRole("textbox"), name);
    expect(screen.getByRole("textbox")).toHaveValue(name);
    userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText(/Score/)
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
  });
});
