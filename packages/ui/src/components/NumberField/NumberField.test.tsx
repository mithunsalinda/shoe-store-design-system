import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberField } from "./NumberField";

describe("NumberField", () => {
  it("renders a labelled spinbutton", () => {
    render(<NumberField defaultValue={8} label="Pairs" />);

    expect(screen.getByRole("textbox", { name: "Pairs" })).toHaveValue("8");
  });

  it("increments and decrements from stepper buttons", () => {
    render(<NumberField defaultValue={8} label="Pairs" />);

    fireEvent.click(screen.getByRole("button", { name: "Increase Pairs" }));
    expect(screen.getByRole("textbox", { name: "Pairs" })).toHaveValue("9");

    fireEvent.click(screen.getByRole("button", { name: "Decrease Pairs" }));
    expect(screen.getByRole("textbox", { name: "Pairs" })).toHaveValue("8");
  });

  it("calls onValueChange when the value changes", () => {
    const onValueChange = vi.fn();

    render(<NumberField defaultValue={3} label="Quantity" onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Increase Quantity" }));

    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it("renders error state and description", () => {
    render(
      <NumberField
        defaultValue={0}
        description="Minimum order quantity"
        error="Enter at least 1 pair"
        label="Quantity"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Quantity" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Minimum order quantity Enter at least 1 pair");
  });

  it("can hide steppers", () => {
    render(<NumberField defaultValue={12} label="Manual count" showSteppers={false} />);

    expect(screen.getByRole("textbox", { name: "Manual count" })).toHaveValue("12");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
