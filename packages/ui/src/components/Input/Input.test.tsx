import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a native input", () => {
    render(<Input aria-label="Email address" />);

    expect(screen.getByRole("textbox", { name: "Email address" })).toBeInTheDocument();
  });

  it("accepts typed values", async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Search" />);
    await user.type(screen.getByRole("textbox", { name: "Search" }), "running shoes");

    expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("running shoes");
  });

  it("marks invalid input with aria-invalid", () => {
    render(<Input aria-label="Email" invalid />);

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards refs to the underlying input", () => {
    const ref = { current: null as HTMLInputElement | null };

    render(<Input ref={ref} aria-label="Focusable" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
