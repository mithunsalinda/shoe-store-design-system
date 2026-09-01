import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "standard", label: "Standard" },
  { value: "wide", label: "Wide" },
  { value: "extra-wide", label: "Extra wide", disabled: true },
];

describe("RadioGroup", () => {
  it("renders an accessible group label", () => {
    render(<RadioGroup label="Fit width" options={options} />);

    expect(screen.getByRole("radiogroup", { name: "Fit width" })).toBeInTheDocument();
  });

  it("supports uncontrolled selected state", () => {
    render(<RadioGroup label="Fit width" defaultValue="wide" options={options} />);

    expect(screen.getByRole("radio", { name: "Wide" })).toBeChecked();
  });

  it("calls onValueChange when a radio is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<RadioGroup label="Fit width" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("radio", { name: "Wide" }));

    expect(onValueChange).toHaveBeenCalledWith("wide");
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<RadioGroup label="Fit width" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("radio", { name: "Extra wide" }));

    expect(screen.getByRole("radio", { name: "Extra wide" })).not.toBeChecked();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("marks invalid groups with aria-invalid", () => {
    render(<RadioGroup label="Fit width" invalid options={options} />);

    expect(screen.getByRole("radiogroup", { name: "Fit width" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
