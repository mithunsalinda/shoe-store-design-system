import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders a pressable toggle button", () => {
    render(<Toggle>Grid view</Toggle>);

    expect(screen.getByRole("button", { name: "Grid view" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("supports a default pressed state", () => {
    render(<Toggle defaultPressed>Grid view</Toggle>);

    expect(screen.getByRole("button", { name: "Grid view" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("calls onPressedChange when toggled", () => {
    const onPressedChange = vi.fn();

    render(<Toggle onPressedChange={onPressedChange}>Grid view</Toggle>);
    fireEvent.click(screen.getByRole("button", { name: "Grid view" }));

    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("passes through disabled state", () => {
    render(<Toggle disabled>Grid view</Toggle>);

    expect(screen.getByRole("button", { name: "Grid view" })).toBeDisabled();
  });
});
