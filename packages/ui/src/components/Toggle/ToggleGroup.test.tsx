import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup } from "./ToggleGroup";

const items = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
  { value: "table", label: "Table" },
];

describe("ToggleGroup", () => {
  it("renders a labeled toggle group", () => {
    render(<ToggleGroup ariaLabel="View mode" items={items} defaultValue={["grid"]} />);

    expect(screen.getByRole("group", { name: "View mode" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Grid" })).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onValueChange when an item is selected", () => {
    const onValueChange = vi.fn();

    render(<ToggleGroup ariaLabel="View mode" items={items} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "List" }));

    expect(onValueChange).toHaveBeenCalledWith(["list"]);
  });

  it("allows multiple pressed items", () => {
    render(<ToggleGroup ariaLabel="Filters" items={items} multiple />);

    fireEvent.click(screen.getByRole("button", { name: "Grid" }));
    fireEvent.click(screen.getByRole("button", { name: "List" }));

    expect(screen.getByRole("button", { name: "Grid" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");
  });

  it("passes disabled state through to items", () => {
    render(<ToggleGroup ariaLabel="View mode" items={[{ ...items[0]!, disabled: true }]} />);

    expect(screen.getByRole("button", { name: "Grid" })).toBeDisabled();
  });
});
