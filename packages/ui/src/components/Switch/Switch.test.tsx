import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with an accessible label", () => {
    render(<Switch label="Product alerts" />);

    expect(screen.getByRole("switch", { name: "Product alerts" })).toBeInTheDocument();
  });

  it("supports uncontrolled checked state", async () => {
    const user = userEvent.setup();

    render(<Switch label="Product alerts" />);
    const toggle = screen.getByRole("switch", { name: "Product alerts" });

    await user.click(toggle);

    expect(toggle).toBeChecked();
  });

  it("calls onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Switch label="Product alerts" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch", { name: "Product alerts" }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Switch label="Disabled alerts" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch", { name: "Disabled alerts" }));

    expect(screen.getByRole("switch", { name: "Disabled alerts" })).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("marks invalid switches with aria-invalid", () => {
    render(<Switch label="Policy updates" invalid />);

    expect(screen.getByRole("switch", { name: "Policy updates" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
