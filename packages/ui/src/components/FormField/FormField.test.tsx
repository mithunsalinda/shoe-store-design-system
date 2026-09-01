import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../Input";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("associates a label with the control", () => {
    render(
      <FormField label="Email address">
        <Input />
      </FormField>,
    );

    expect(screen.getByRole("textbox", { name: "Email address" })).toBeInTheDocument();
  });

  it("connects description and error text to the control", () => {
    render(
      <FormField
        label="Email address"
        description="We'll only use this for order updates."
        error="Email is required"
      >
        <Input />
      </FormField>,
    );

    const input = screen.getByRole("textbox", { name: "Email address" });

    expect(input).toHaveAccessibleDescription(
      "We'll only use this for order updates. Email is required",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
  });

  it("preserves an explicit control id", () => {
    render(
      <FormField label="Shoe size">
        <Input id="shoe-size" />
      </FormField>,
    );

    expect(screen.getByLabelText("Shoe size")).toHaveAttribute("id", "shoe-size");
  });
});
