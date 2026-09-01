import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders with an accessible label", () => {
    render(<Checkbox label="Accept terms" />);

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("supports uncontrolled checked state", async () => {
    const user = userEvent.setup();

    render(<Checkbox label="Compare products" />);
    const checkbox = screen.getByRole("checkbox", { name: "Compare products" });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("calls onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Checkbox label="Email offers" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Email offers" }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Checkbox label="Disabled option" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Disabled option" }));

    expect(screen.getByRole("checkbox", { name: "Disabled option" })).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("exposes the mixed state when indeterminate", () => {
    render(<Checkbox label="Some sizes selected" indeterminate />);

    expect(screen.getByRole("checkbox", { name: "Some sizes selected" })).toBePartiallyChecked();
  });
});
