import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders an accessible date input with a label", () => {
    render(<DatePicker label="Delivery date" />);

    const input = screen.getByLabelText("Delivery date");

    expect(input).toHaveAttribute("type", "date");
  });

  it("emits value changes", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    render(<DatePicker label="Launch date" onValueChange={handleValueChange} />);

    await user.type(screen.getByLabelText("Launch date"), "2026-09-15");

    expect(handleValueChange).toHaveBeenLastCalledWith("2026-09-15");
  });

  it("wires description and error text to the input", () => {
    render(
      <DatePicker
        description="Use your local delivery calendar."
        error="Choose a future date."
        label="Pickup date"
      />,
    );

    const input = screen.getByLabelText("Pickup date");

    expect(input).toHaveAccessibleDescription(
      "Use your local delivery calendar. Choose a future date.",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("supports min, max, required, disabled, and read only states", () => {
    render(
      <DatePicker
        disabled
        label="Return window"
        max="2026-12-31"
        min="2026-01-01"
        readOnly
        required
      />,
    );

    const input = screen.getByLabelText("Return window");

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("min", "2026-01-01");
    expect(input).toHaveAttribute("max", "2026-12-31");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("readonly");
  });

  it("shows a clear button for controlled values", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    render(<DatePicker label="Sale starts" onValueChange={handleValueChange} value="2026-08-26" />);

    await user.click(screen.getByRole("button", { name: "Clear date" }));

    expect(handleValueChange).toHaveBeenCalledWith("");
  });

  it("clears uncontrolled values", async () => {
    const user = userEvent.setup();
    render(<DatePicker defaultValue="2026-08-26" label="Sale ends" />);

    await user.click(screen.getByRole("button", { name: "Clear date" }));

    expect(screen.getByLabelText("Sale ends")).toHaveValue("");
  });
});
