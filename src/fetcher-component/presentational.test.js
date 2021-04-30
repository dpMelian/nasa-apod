import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Presentational from "./presentational";

describe("presentational component", () => {
  test("if loading message appears on render", () => {
    render(<Presentational data={{ isLoaded: false }} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("if heading appears when loaded", () => {
    render(<Presentational data={{ isLoaded: true }} />);

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/nasa astronomy picture of the day/i)
    ).toBeInTheDocument();
  });

  test("if buttons are rendered", () => {
    render(<Presentational data={{ isLoaded: true }} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent(/random apod/i);
    expect(buttons[1]).toHaveTextContent(/view hd version/i);
  });
});
