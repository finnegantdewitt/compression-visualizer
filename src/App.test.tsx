import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders lyrics", () => {
  render(<App />);
  const linkElement = screen.getByText(/We're no strangers to love/i);
  expect(linkElement).toBeInTheDocument();
});
