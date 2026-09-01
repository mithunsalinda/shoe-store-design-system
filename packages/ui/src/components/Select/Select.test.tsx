import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "pickup", label: "Store pickup" },
  { value: "standard", label: "Standard shipping" },
  { value: "express", label: "Express shipping", disabled: true },
];

describe("Select", () => {
  it("renders an accessible label and placeholder", () => {
    render(<Select label="Fulfillment" options={options} placeholder="Choose delivery" />);

    expect(screen.getByRole("combobox", { name: "Fulfillment" })).toHaveTextContent(
      "Choose delivery",
    );
  });

  it("renders the selected item for defaultValue", () => {
    render(<Select label="Fulfillment" options={options} defaultValue="standard" />);

    expect(screen.getByRole("combobox", { name: "Fulfillment" })).toHaveTextContent(
      "Standard shipping",
    );
  });

  it("calls onValueChange when an option is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Select label="Fulfillment" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox", { name: "Fulfillment" }));
    await user.click(await screen.findByRole("option", { name: "Standard shipping" }));

    expect(onValueChange).toHaveBeenCalledWith("standard");
  });

  it("does not select disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Select label="Fulfillment" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox", { name: "Fulfillment" }));

    const listbox = await screen.findByRole("listbox");
    await user.click(within(listbox).getByRole("option", { name: "Express shipping" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("marks invalid selects with aria-invalid", () => {
    render(<Select label="Fulfillment" invalid options={options} />);

    expect(screen.getByRole("combobox", { name: "Fulfillment" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
