import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders an accessible loading status", () => {
    render(<Spinner />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("supports a custom label", () => {
    render(<Spinner label="Saving product" />);

    expect(screen.getByRole("status", { name: "Saving product" })).toBeInTheDocument();
  });

  it("passes through span attributes", () => {
    render(<Spinner data-testid="spinner" />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
