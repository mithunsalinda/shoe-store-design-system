import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../Checkbox";
import { Fieldset } from "./Fieldset";

describe("Fieldset", () => {
  it("renders a grouped fieldset with a legend", () => {
    render(
      <Fieldset legend="Preferences">
        <Checkbox label="New arrivals" />
        <Checkbox label="Sale alerts" />
      </Fieldset>,
    );

    const group = screen.getByRole("group", { name: "Preferences" });

    expect(group).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "New arrivals" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Sale alerts" })).toBeInTheDocument();
  });

  it("wires description and error text to the fieldset", () => {
    render(
      <Fieldset
        description="Choose how we should contact you."
        error="Select at least one preference."
        legend="Notifications"
      >
        <Checkbox label="Email" />
      </Fieldset>,
    );

    const group = screen.getByRole("group", { name: "Notifications" });

    expect(group).toHaveAccessibleDescription(
      "Choose how we should contact you. Select at least one preference.",
    );
    expect(group).toHaveAttribute("aria-invalid", "true");
  });

  it("supports disabled fieldset state", () => {
    render(
      <Fieldset disabled legend="Delivery options">
        <Checkbox label="Saturday delivery" />
      </Fieldset>,
    );

    expect(screen.getByRole("group", { name: "Delivery options" })).toBeDisabled();
  });
});
