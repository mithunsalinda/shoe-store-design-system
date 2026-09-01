import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

const options = [
  { value: "runner", label: "Runner" },
  { value: "trainer", label: "Trainer", description: "Everyday gym shoe" },
  { value: "loafer", label: "Loafer", disabled: true },
];

describe("Combobox", () => {
  it("renders an accessible input and placeholder", () => {
    render(<Combobox label="Shoe type" options={options} placeholder="Search shoe types" />);

    expect(screen.getByRole("combobox", { name: "Shoe type" })).toHaveAttribute(
      "placeholder",
      "Search shoe types",
    );
  });

  it("shows the default selected value", () => {
    render(<Combobox defaultValue="trainer" label="Shoe type" options={options} />);

    expect(screen.getByRole("combobox", { name: "Shoe type" })).toHaveValue("Trainer");
  });

  it("calls onValueChange when an option is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Combobox label="Shoe type" onValueChange={onValueChange} options={options} />);
    await user.click(screen.getByRole("combobox", { name: "Shoe type" }));
    await user.click(await screen.findByRole("option", { name: "Trainer Everyday gym shoe" }));

    expect(onValueChange).toHaveBeenCalledWith("trainer");
  });

  it("filters matching options", async () => {
    const user = userEvent.setup();

    render(<Combobox label="Shoe type" options={options} />);
    await user.type(screen.getByRole("combobox", { name: "Shoe type" }), "run");

    const listbox = await screen.findByRole("listbox");

    expect(within(listbox).getByRole("option", { name: "Runner" })).toBeInTheDocument();
    expect(within(listbox).queryByRole("option", { name: "Trainer Everyday gym shoe" })).toBeNull();
  });

  it("marks invalid comboboxes with accessible error text", () => {
    render(<Combobox error="Choose a shoe type" label="Shoe type" options={options} />);

    const input = screen.getByRole("combobox", { name: "Shoe type" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Choose a shoe type");
  });
});
